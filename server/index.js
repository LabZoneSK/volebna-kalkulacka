import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

if (!process.env.AIRTABLE_API_KEY) {
    console.error('Missing AIRTABLE_API_KEY in .env file')
    process.exit(1)
}
const transformResponseToQuestions = (response) => {
    return response.map((item, index) => {
        return {
            question_id: (index + 1).toString(), // or item.id if you want to keep the original id
            text: item.fields.Text,
            weight: item.fields.Weight || 1,
            description: item.fields.Popis || '',
        }
    })
}

export const transformResponseToPoliticalParties = (response) => {
    return response.map((item, index) => {
        // Extract all answer keys and values
        const answerEntries = Object.entries(item.fields).filter(
            ([key]) => key !== 'Strana' && !key.startsWith('zdovodnenie_')
        )

        const answers = answerEntries
            .map(([question_id, answer_value]) => {
                //If question_id is not a number, return null
                if (isNaN(Number(question_id))) return null

                // Map 'Ano', 'Neviem' and 'Nie' to respective numeric values
                let numericAnswer = 0
                if (answer_value === 'Ano') numericAnswer = 1
                else if (answer_value === 'Nie') numericAnswer = -1
                // 'Neviem' remains as 0

                // Find explanation for the answer
                const explanationKey = 'zdovodnenie_' + question_id
                const explanation = item.fields[explanationKey]

                return {
                    question_id,
                    answer_value: numericAnswer,
                    explanation: explanation || null, // set to null if no explanation exists
                }
            })
            .filter((answer) => answer !== null)

        return {
            party_id: (index + 1).toString(), // or item.id if you want to keep the original id
            party_name: item.fields.Strana,
            logo: item.fields.Logo?.[0].url || '',
            answers,
        }
    })
}

const cacheDuration = process.env.CACHE_DURATION || 5 * 60 * 1000
let cachedQuestions = null
let cacheTimestamp = null

let cachedAnswers = null
let cacheAnswersTimestamp = null

const airtableAxios = axios.create({
    baseURL: 'https://api.airtable.com/v0/appKhVso0XbQ4rKpK',
    headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
})

const fetchAirtable = async (path) => {
    try {
        const response = await airtableAxios.get(path)
        return response.data.records
    } catch (error) {
        console.error(`Failed to fetch data from Airtable: ${error}`)
        throw error
    }
}

const app = express()

const PORT = process.env.SERVER_PORT || 3001

// Add CORS headers
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

// Implement caching
app.use((_req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    next()
})

app.get('/questions', async (req, res) => {
    const currentTime = new Date().getTime()

    // Check if cache exists and is valid
    if (
        cachedQuestions &&
        cacheTimestamp &&
        currentTime - cacheTimestamp <= cacheDuration
    ) {
        return res.json(cachedQuestions)
    }

    try {
        const result = await fetchAirtable(process.env.QUESTIONS_TABLE)
        const transformedResult = transformResponseToQuestions(result)

        // Update cache
        cachedQuestions = transformedResult
        cacheTimestamp = currentTime

        res.json(transformedResult)
    } catch (error) {
        console.error(`Failed to fetch data from Airtable: ${error}`)
        res.status(500).json({ error: 'Failed to fetch questions' })
    }
})

app.get('/answers', async (req, res) => {
    const currentTime = new Date().getTime()

    // Check if cache exists and is valid
    if (
        cachedAnswers &&
        cacheAnswersTimestamp &&
        currentTime - cacheAnswersTimestamp <= cacheDuration
    ) {
        return res.json(cachedAnswers)
    }

    try {
        // Use only the path to the API endpoint
        const result = await fetchAirtable(process.env.ANSWERS_TABLE)
        // Transform the response to the desired format
        const transformedResult = transformResponseToPoliticalParties(result)

        // Update cache
        cachedAnswers = transformedResult
        cacheAnswersTimestamp = currentTime

        res.json(transformedResult)
    } catch (error) {
        console.error(`Failed to fetch data from Airtable: ${error}`)
        res.status(500).json({ error: 'Failed to fetch answers' })
    }
})

app.get('/health-check', (req, res) => {
    res.json({ message: 'Server up and running' })
})

app.listen(PORT, () => {
    console.log('Server Running on PORT', PORT)
})
