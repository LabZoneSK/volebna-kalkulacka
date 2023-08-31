// StepWrapper.js
import {
    currentQuestionAtom,
    nextQuestionAtom,
    previousQuestionAtom,
    questionsFormActiveAtom,
    questionsAtom,
} from '../AnswersForm/answers.form.atoms'
import { useAtom, useAtomValue } from 'jotai'
import ChevronMagenta from '../../assets/chevron-magenta.svg'
import { titleAtom } from '../../atoms/common.atoms'

interface StepWrapperProps {
    children: React.ReactNode
}

const StepWrapper: React.FC<StepWrapperProps> = ({ children }) => {
    const currentQuestion = useAtomValue(currentQuestionAtom)
    const questionsFormActive = useAtomValue(questionsFormActiveAtom)
    const questions = useAtomValue(questionsAtom)
    const [, nextQuestion] = useAtom(nextQuestionAtom)
    const [, previousQuestion] = useAtom(previousQuestionAtom)
    const title = useAtomValue(titleAtom)

    const wrapperPadding = questionsFormActive
        ? 'pt-100 px-0'
        : 'py-12 md:py-77 px-8 md:px-100'

    const showChevronNext =
        currentQuestion !== 0 && questions.length > currentQuestion + 1
    const showChevronPrevious = currentQuestion !== 0

    return (
        <div className="mx-auto">
            <section className="mb-62 mt-62 w-full">
                <h1 className="text-center font-poppins text-40 font-bold">
                    {title}
                </h1>
            </section>

            <img
                src="/images/big-x.png"
                alt=""
                style={{
                    width: '750px',
                    height: '700px',
                    right: '0',
                    top: '100px',
                    position: 'absolute',
                }}
            />

            <div className="relative">
                <section
                    className={`text-center ${wrapperPadding} w-full rounded-cool border border-light-grey bg-white bg-opacity-90 shadow-custom-light backdrop-blur md:w-930`}
                >
                    {children}
                </section>
                {showChevronPrevious && (
                    <section className="gap-930 absolute top-200 flex w-full md:w-960">
                        <div className="absolute -left-50 text-left">
                            <button onClick={() => previousQuestion()}>
                                <img src={ChevronMagenta} alt="Back" />
                            </button>
                        </div>
                    </section>
                )}
                {showChevronNext && (
                    <section className="gap-930 absolute top-200 flex w-960">
                        <div className="absolute -right-20 text-right">
                            <button onClick={() => nextQuestion()}>
                                <img
                                    className="rotate-180"
                                    src={ChevronMagenta}
                                    alt="Next"
                                />
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default StepWrapper
