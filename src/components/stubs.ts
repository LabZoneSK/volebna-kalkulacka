import { PoliticalParty, Question } from '../@types'
export const questionsStub: Question[] = [
    {
        question_id: '1',
        text: 'Som za vystupenie z NATO',
        weight: 3,
        description: 'Toto je popis k otazke',
    },
    {
        question_id: '2',
        text: 'Som za posilnenie prav LGBTI+ komunity',
        weight: 1,
        description: 'Toto je popis k otazke',
    },
    {
        question_id: '3',
        text: 'Podporujem EU a jej rozsirovanie',
        weight: 2,
        description: 'Toto je popis k otazke',
    },
    {
        question_id: '4',
        text: 'Som za zrusenie povinneho ockovania',
        weight: 1,
        description: 'Toto je popis k otazke',
    },
]

export const politicalPartiesStub: PoliticalParty[] = [
    {
        party_id: '1',
        party_name: 'LSNS',
        answers: [
            {
                question_id: '1',
                answer_value: 1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '2',
                answer_value: -1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '3',
                answer_value: -1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '4',
                answer_value: 1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
        ],
    },
    {
        party_id: '2',
        party_name: 'SAS',
        answers: [
            {
                question_id: '1',
                answer_value: -1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '2',
                answer_value: 1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '3',
                answer_value: 1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '4',
                answer_value: 1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
        ],
    },
    {
        party_id: '3',
        party_name: 'KDH',
        answers: [
            {
                question_id: '1',
                answer_value: -1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '2',
                answer_value: 0,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '3',
                answer_value: 1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
            {
                question_id: '4',
                answer_value: -1,
                explanation: 'Toto je vysvetlenie odpovede',
            },
        ],
    },
]
