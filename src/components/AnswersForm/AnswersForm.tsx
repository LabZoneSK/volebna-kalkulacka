import React, { useEffect } from 'react'
import { UserAnswersProps } from '../../@types'
import {
    currentQuestionAtom,
    nextQuestionAtom,
    questionsFormActiveAtom,
    answersAtom,
} from './answers.form.atoms'
import { nextStepAtom } from '../AppSteps/stepper.atoms'
import { useAtom, useSetAtom, useAtomValue } from 'jotai'
import AnswerButton from '../common/AnswerButton'
import { AnswerButtonType } from '../../@types'

import { ReactComponent as Star } from '../../assets/star.svg'
import { ReactComponent as StarFull } from '../../assets/star_full.svg'
import Thumb from '../../assets/thumb.svg'
import ReactMarkdown from 'react-markdown'
import { useMatchingLogic } from './useMatchingLogic'
import { titleAtom } from '../../atoms/common.atoms'
import Button from '../common/Button'

const UserAnswers: React.FC<UserAnswersProps> = ({ questions }) => {
    const answers = useAtomValue(answersAtom)
    const currentQuestion = useAtomValue(currentQuestionAtom)
    const [, nextQuestion] = useAtom(nextQuestionAtom)
    const setQuestionsActive = useSetAtom(questionsFormActiveAtom)
    const nextStep = useSetAtom(nextStepAtom)
    const setTitle = useSetAtom(titleAtom)

    const { submitAnswers } = useMatchingLogic()

    // Set true if current step is half of all questions
    const [showGift, setShowGift] = React.useState<boolean>(false)

    const [importantQuestions, setImportantQuestions] = React.useState<
        boolean[]
    >(new Array(questions.length).fill(false))

    setQuestionsActive(true)

    useEffect(() => {
        if (currentQuestion === Math.floor(questions.length / 2)) {
            setShowGift(true)
        }
    }, [currentQuestion, questions.length])

    const handleResponse = (value: number) => {
        answers[currentQuestion] = value
        if (currentQuestion >= questions.length - 1) {
            submitAnswers()
            nextStep()
            return
        }
        nextQuestion()
    }

    if (showGift) {
        setTitle('Ide ti to super, už si v polovici!')

        return (
            <div className="relative">
                <img
                    className="-mt-100 w-full rounded-cool"
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXRobTJzZWdvbTNsbmVkY2E4Mjh1MGd3OXgwcnBpeXo4M3czbmFhZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif"
                />
                <div className="absolute inset-x-0 bottom-30">
                    <Button
                        handleClick={() => setShowGift(false)}
                        label="Poďme ďalej"
                    />
                </div>
            </div>
        )
    }

    setTitle('Volebná kalkulačka')
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex w-full flex-col gap-6 px-50 md:flex-row md:gap-20">
                    <div className="selft-center flex w-[190px]">
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

                        {questions[currentQuestion].description && (
                            <div className="markdown-content mb-50 font-poppins">
                                <ReactMarkdown linkTarget="_blank">
                                    {questions[currentQuestion].description}
                                </ReactMarkdown>
                            </div>
                        )}

                        <div className="mb-50 flex flex-col gap-12 md:flex-row md:gap-70">
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
                        <button
                            className="font-poppins text-18"
                            onClick={() => {
                                questions[currentQuestion].isImportant =
                                    !questions[currentQuestion].isImportant
                                importantQuestions[currentQuestion] =
                                    !importantQuestions[currentQuestion]
                                setImportantQuestions([...importantQuestions])
                            }}
                        >
                            <div className="flex flex-col items-center gap-20 md:flex-row">
                                {importantQuestions[currentQuestion] ? (
                                    <StarFull className="w-[24px]" />
                                ) : (
                                    <Star className="w-[24px]" />
                                )}
                                <span className="select-none select-none font-poppins text-18">
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
                            <div className="flex flex-col-reverse items-center gap-20 md:flex-row">
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
