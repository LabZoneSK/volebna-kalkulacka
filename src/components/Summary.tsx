import React from 'react'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'

import { useAtomValue, useAtom, useSetAtom } from 'jotai'
import { questionsAtom, answersAtom } from './AnswersForm/answers.form.atoms'
import { nextStepAtom } from './AppSteps/stepper.atoms'
import { Question } from '../@types'
import Chevron from '../assets/chevron-white.svg'
import { ReactComponent as Thumb } from '../assets/thumb.svg'
import { ReactComponent as Yes } from '../assets/yes.svg'
import { ReactComponent as No } from '../assets/no.svg'
import Button from './common/Button'

import { getResponseText } from '../helpers/answers'
import { ReactComponent as Star } from '../assets/star.svg'
import { ReactComponent as StarFull } from '../assets/star_full.svg'
import { useMatchingLogic } from './AnswersForm/useMatchingLogic'

interface AnswerRowProps {
    question: Question
    answer: number
    index: number
    handleAnswerChange: (index: number, answer: number) => void
}

const AnswerRow: React.FC<AnswerRowProps> = ({
    question,
    index,
    answer,
    handleAnswerChange,
}) => {
    const [show, setShow] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [questions, setQuestions] = useAtom(questionsAtom)
    const { submitAnswers } = useMatchingLogic()

    const answerClass = classNames(
        'relative h-[95px] py-20 px-30 bg-magenta flex flex-col justify-center rounded-bl-cool rounded-br-cool md:rounded-l-none md:rounded-r-cool items-center',
        {
            'bg-magenta': answer === 1,
            'bg-z-gray': answer === 0,
            'bg-z-blue': answer === -1,
        }
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShow(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const changeImportanceOfQuestion = (question: Question) => {
        const updatedQuestions = questions.map((q: Question) => {
            if (q.question_id === question.question_id) {
                q.isImportant = !question.isImportant
                return q
            }
            return q
        })
        setQuestions(updatedQuestions)
        submitAnswers()
    }

    return (
        <div className="relative grid w-full grid-cols-1 grid-rows-1 items-center rounded-cool border border-light-grey bg-white md:grid-cols-[75px_1fr_140px]">
            <div className="mt-6 flex h-full flex-col items-center justify-center border-r md:mt-0">
                <button onClick={() => changeImportanceOfQuestion(question)}>
                    {question.isImportant ? (
                        <StarFull className="w-[39px] text-center text-magenta" />
                    ) : (
                        <Star className="w-[39px] text-center text-magenta" />
                    )}
                </button>
            </div>
            <div className="mx-6 flex flex-grow items-center py-20 md:mx-0 md:px-30 md:py-0">
                <div className="w-[39px] text-center font-poppins text-26 font-bold text-magenta">
                    {index + 1}
                </div>
                <div className="pl-20 font-poppins text-18 font-bold">
                    {question.text}
                </div>
            </div>
            <div className={answerClass} ref={ref}>
                <button
                    className="flex items-center gap-20"
                    onClick={() => setShow(!show)}
                >
                    <div className="font-poppins font-bold text-white">
                        {getResponseText(answer)}
                    </div>
                    <img src={Chevron} alt="" />
                </button>

                {show && (
                    <div className="absolute left-1/2 top-0 z-50 mt-80 w-56 -translate-x-[55px] rounded-[10px] bg-white shadow-lg">
                        <svg
                            width="26px"
                            height="26px"
                            viewBox="0 0 37 36"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-[62px] top-[-12px]"
                        >
                            <path
                                d="M16.263,1.121c1.172,-1.171 3.071,-1.171 4.243,0l16.264,16.264l-36.77,-0l16.263,-16.264Z"
                                fill="#fff"
                            />
                        </svg>

                        <button
                            className="w-full px-30 px-30 py-20 text-center hover:bg-z-hover hover:font-bold"
                            onClick={() => {
                                handleAnswerChange(index, 1)
                                submitAnswers()
                                setShow(false)
                            }}
                        >
                            <div className="flex items-center gap-20">
                                <Yes className="w-[18px] text-magenta" />
                                <span className="text-left font-poppins text-18">
                                    Áno
                                </span>
                            </div>
                        </button>
                        <button
                            className="w-full px-30 px-30 py-20 text-center hover:bg-z-hover hover:font-bold"
                            onClick={() => {
                                handleAnswerChange(index, -1)
                                submitAnswers()
                                setShow(false)
                            }}
                        >
                            <div className="flex items-center gap-20">
                                <No className="w-[18px] text-z-blue" />
                                <span className="text-left font-poppins text-18">
                                    Nie
                                </span>
                            </div>
                        </button>
                        <button
                            className="px-30 px-30 py-20 text-center hover:bg-z-hover hover:font-bold"
                            onClick={() => {
                                handleAnswerChange(index, 0)
                                submitAnswers()
                                setShow(false)
                            }}
                        >
                            <div className="flex items-center gap-20">
                                <Thumb className="w-[28px]" />
                                <span className="text-left font-poppins text-18">
                                    Nie je to pre mňa dôležité
                                </span>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

const Summary = () => {
    const questions = useAtomValue(questionsAtom)
    const [answers, setAnswers] = useAtom(answersAtom)
    const setNextStep = useSetAtom(nextStepAtom)

    return (
        <div className="mx-auto">
            <section className="mb-62 mt-62 w-full">
                <h1 className="text-center font-poppins text-40 font-bold">
                    Takéto sú tvoje odpovede.
                    <br />
                    Chceš niečo zmeniť?
                </h1>
            </section>
            <section className="mx-auto mb-80 w-full md:w-930">
                <div className="flex flex-col gap-20 ">
                    {questions.map((question, index) => (
                        <AnswerRow
                            key={index}
                            question={question}
                            index={index}
                            answer={answers[index]}
                            handleAnswerChange={(index, answer) => {
                                setAnswers((prev) => {
                                    const newAnswers = [...prev]
                                    newAnswers[index] = answer
                                    return newAnswers
                                })
                            }}
                        />
                    ))}
                </div>
            </section>
            <section className="mb-100 w-full text-center">
                <Button
                    label="Zobraziť výsledky"
                    handleClick={() => setNextStep()}
                />
            </section>
        </div>
    )
}

export default Summary
