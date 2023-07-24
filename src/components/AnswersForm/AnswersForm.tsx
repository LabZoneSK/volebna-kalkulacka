import React from 'react'
import { UserAnswersProps } from '../../@types'
import {
    currentQuestionAtom,
    nextQuestionAtom,
    userMatchPartyAtom,
    matchingQuestionsAtom,
    questionsFormActiveAtom,
    answersAtom,
} from './answers.form.atoms'
import { nextStepAtom } from '../AppSteps/stepper.atoms'
import { useAtom, useSetAtom, useAtomValue } from 'jotai'
import AnswerButton from '../common/AnswerButton'
import { AnswerButtonType } from '../../@types'

import Star from '../../assets/star.svg'
import Thumb from '../../assets/thumb.svg'

const UserAnswers: React.FC<UserAnswersProps> = ({
    questions,
    politicalParties,
}) => {
    const answers = useAtomValue(answersAtom)
    const setUserMatchParty = useSetAtom(userMatchPartyAtom)
    const setMatchingQuestions = useSetAtom(matchingQuestionsAtom)
    const currentQuestion = useAtomValue(currentQuestionAtom)
    const [, nextQuestion] = useAtom(nextQuestionAtom)
    const setQuestionsActive = useSetAtom(questionsFormActiveAtom)
    const nextStep = useSetAtom(nextStepAtom)

    setQuestionsActive(true)

    const calculateCompliance = (
        userAnswers: number[],
        partyAnswers: number[]
    ): number => {
        let total = 0
        let count = 0

        userAnswers.forEach((answer, index) => {
            if (answer !== 0) {
                total +=
                    (answer === partyAnswers[index] ? 1 : -1) *
                    questions[index].weight
                count += questions[index].weight
            }
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

            return {
                party_id: party.party_id,
                party_name: party.party_name,
                logo: party.logo,
                compliance: calculateCompliance(answers, partyAnswers),
                answers: partyAnswers,
            }
        })

        const bestMatchParty = distances.reduce((prev, current) => {
            return prev.compliance > current.compliance ? prev : current
        })

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

    const handleResponse = (value: number) => {
        answers[currentQuestion] = value
        if (currentQuestion >= questions.length - 1) {
            submitAnswers()
            nextStep()
            return
        }
        nextQuestion()
    }

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex w-full gap-20 px-50">
                    <div className="flex w-[190px] ">
                        <span className="mr-2 font-poppins text-50 font-bold text-magenta">
                            {currentQuestion + 1}
                        </span>
                        <span className="text-20 mt-3 font-poppins">
                            / {questions.length}
                        </span>
                    </div>
                    <div className="text-left">
                        <p className="mb-30 text-left font-poppins text-26 font-bold">
                            {questions[currentQuestion].text}
                        </p>
                        <p className="mb-50 font-poppins">
                            {questions[currentQuestion].description}
                        </p>

                        <div className="mb-50 flex gap-70">
                            <AnswerButton
                                onClick={() => handleResponse(1)}
                                type={AnswerButtonType.YES}
                                answer={answers[currentQuestion]}
                            />
                            <AnswerButton
                                onClick={() => handleResponse(-1)}
                                type={AnswerButtonType.NO}
                                answer={answers[currentQuestion]}
                            />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="flex">
                    <div className="w-1/2 border-r py-30">
                        <button className="font-poppins text-18">
                            <div className="flex flex-row gap-20">
                                <img
                                    src={Star}
                                    alt="Je to pre mňa dôležité"
                                    className="w-[24px]"
                                />
                                <span className="font-poppins text-18">
                                    Je to pre mňa dôležité
                                </span>
                            </div>
                        </button>
                    </div>
                    <div className="w-1/2 py-30">
                        <button
                            className="font-poppins text-18"
                            onClick={() => handleResponse(0)}
                        >
                            <div className="flex flex-row gap-20">
                                <span className="font-poppins text-18">
                                    Nie je to pre mňa dôležité, preskočiť
                                </span>
                                <img
                                    src={Thumb}
                                    alt="Nie je to pre mňa dôležité, preskočiť"
                                    className="w-[24px]"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserAnswers
