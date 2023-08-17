import { Question, PoliticalParty, Answer } from '../@types'

export const transformResponseToQuestions = (response: any[]): Question[] => {
    return response.map((item, index) => {
        return {
            question_id: (index + 1).toString(), // or item.id if you want to keep the original id
            text: item.fields.Text,
            weight: item.fields.Weight || 1,
            description: item.fields.Popis || '',
        }
    })
}

export const transformResponseToPoliticalParties = (
    response: any[]
): PoliticalParty[] => {
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
            .filter((answer): answer is Answer => answer !== null)

        return {
            party_id: (index + 1).toString(), // or item.id if you want to keep the original id
            party_name: item.fields.Strana,
            logo: item.fields.Logo?.[0].url || '',
            answers,
        }
    })
}
