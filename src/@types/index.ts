export interface Question {
    question_id: string
    description: string
    text: string
    weight: number
    isImportant?: boolean
}

export interface UserAnswersProps {
    questions: Question[]
    politicalParties: PoliticalParty[]
}

export interface Answer {
    question_id: string
    answer_value: number
    explanation: string | null
}
export interface PoliticalParty {
    party_id: string
    party_name: string
    compliance?: number
    logo?: string
    answers: Answer[]
}

export enum AnswerButtonType {
    YES = 'yes',
    NO = 'no',
}

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INVERTED = 'inverted',
}
