import {
    questionsAtom,
    partiesAtom,
    userMatchPartyAtom,
    matchingQuestionsAtom,
    answersAtom,
} from './answers.form.atoms'
import { useAtomValue, useSetAtom } from 'jotai'
import * as Sentry from '@sentry/react'

export const useMatchingLogic = () => {
    const questions = useAtomValue(questionsAtom)
    const politicalParties = useAtomValue(partiesAtom)
    const setUserMatchParty = useSetAtom(userMatchPartyAtom)
    const setMatchingQuestions = useSetAtom(matchingQuestionsAtom)
    const answers = useAtomValue(answersAtom)

    const calculateCompliance = (
        userAnswers: number[],
        partyAnswers: number[]
    ): number => {
        let total = 0
        let count = 0

        userAnswers.forEach((answer, index) => {
            if (answer === 0) {
                return
            }
            // Increase the weight if the question is important
            const weight = questions[index].isImportant
                ? questions[index].weight * 2
                : questions[index].weight
            total += (answer === partyAnswers[index] ? 1 : -1) * weight
            count += weight
        })

        return (total / count / 2 + 0.5) * 100
    }

    const submitAnswers = () => {
        const distances = politicalParties.map((party) => {
            const partyAnswers = questions.map((question) => {
                const answer = party.answers.find(
                    (a) => a.question_id === question.question_id
                )
                return answer ? answer.answer_value : 0
            })

            const partyAnswerExplanation = questions.map((question) => {
                const answer = party.answers.find(
                    (a) => a.question_id === question.question_id
                )
                return answer ? answer.explanation : ''
            })

            return {
                party_id: party.party_id,
                party_name: party.party_name,
                logo: party.logo,
                compliance: calculateCompliance(answers, partyAnswers),
                answers: partyAnswers,
                explanations: partyAnswerExplanation,
            }
        })

        const bestMatchParty =
            distances.length > 0
                ? distances.reduce((prev, current) => {
                      return prev.compliance > current.compliance
                          ? prev
                          : current
                  }, distances[0])
                : null

        if (!bestMatchParty) {
            Sentry.captureException(new Error('No best match party found'))
            return
        }

        const matches = questions
            .filter(
                (_, index) =>
                    answers[index] !== 0 &&
                    answers[index] === bestMatchParty.answers[index]
            )
            .map((question) => question.text)

        setUserMatchParty(bestMatchParty)
        setMatchingQuestions(matches)
    }
    return {
        calculateCompliance,
        submitAnswers,
    }
}
