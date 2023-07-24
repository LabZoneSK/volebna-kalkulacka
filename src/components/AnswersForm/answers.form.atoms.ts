import { atom } from 'jotai'
import { PoliticalParty, Question } from '../../@types'

export const questionsAtom = atom<Question[]>([])
export const answersAtom = atom<number[]>([])
export const partiesAtom = atom<PoliticalParty[]>([])

export const currentQuestionAtom = atom(0)
export const questionsFormActiveAtom = atom(false)

export const userMatchPartyAtom = atom<any>(null)
export const matchingQuestionsAtom = atom<string[]>([])

export const nextQuestionAtom = atom(
    (get) => get(currentQuestionAtom),
    (get, set) => {
        const currentQuestion = get(currentQuestionAtom)
        set(currentQuestionAtom, currentQuestion + 1)
    }
)

export const previousQuestionAtom = atom(
    (get) => get(currentQuestionAtom),
    (get, set) => {
        const currentQuestion = get(currentQuestionAtom)
        if (currentQuestion > 0) {
            set(currentQuestionAtom, currentQuestion - 1)
        }
    }
)
