import { Question, PoliticalParty } from '../@types'

export const transformResponseToQuestions = (response: any[]): Question[] => {
    return response.map((item, index) => {
        return {
            question_id: (index + 1).toString(), // or item.id if you want to keep the original id
            text: item.fields.Text,
            weight: item.fields.Weight,
            description: item.fields.Popis,
        }
    })
}

export const transformResponseToPoliticalParties = (
    response: any[]
): PoliticalParty[] => {
    return response.map((item, index) => {
        // Extract all answer keys and values
        const answerEntries = Object.entries(item.fields).filter(
            ([key]) => key !== 'Strana'
        )

        const answers = answerEntries.map(([question_id, answer_value]) => {
            // Map 'Ano', 'Neviem' and 'Nie' to respective numeric values
            let numericAnswer = 0
            if (answer_value === 'Ano') numericAnswer = 1
            else if (answer_value === 'Nie') numericAnswer = -1
            // 'Neviem' remains as 0

            return {
                question_id,
                answer_value: numericAnswer,
            }
        })

        return {
            party_id: (index + 1).toString(), // or item.id if you want to keep the original id
            party_name: item.fields.Strana,
            logo: item.fields.Logo?.[0].url || '',
            answers,
        }
    })
}
