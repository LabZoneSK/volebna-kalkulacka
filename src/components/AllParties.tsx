import { useRef } from 'react'
import { useSetAtom, useAtomValue } from 'jotai'
import classNames from 'classnames'
import {
    partiesAtom,
    questionsAtom,
    answersAtom,
} from './AnswersForm/answers.form.atoms'
import { prevStepAtom } from './AppSteps/stepper.atoms'
import AnswerTag from './AnswersForm/AnswerTag'
import { ReactComponent as Chevron } from '../assets/chevron.svg'
import ButtonsRow from './common/ButtonsRow'
import { useDrag } from 'react-use-gesture'

const AllParties = () => {
    const questions = useAtomValue(questionsAtom)
    const setPreviousStep = useSetAtom(prevStepAtom)

    const answers = useAtomValue(answersAtom)
    const parties = useAtomValue(partiesAtom)

    const scrollRef = useRef<HTMLElement | null>(null)

    const bind = useDrag(({ movement: [mx], lastOffset: [ox] }) => {
        const el = scrollRef.current
        if (el) {
            el.scrollLeft = ox - mx
        }
    })

    return (
        <div className="mx-auto overflow-hidden">
            <section className="mb-6 mt-62 flex w-full flex-col items-start md:mb-62 md:flex-row md:items-center">
                <h1 className="w-full grow text-left font-poppins text-3xl font-bold md:w-1/2 md:text-40">
                    Porovnanie so všetkými stranami
                </h1>
                <div className="mt-4 text-right md:mt-0">
                    <a
                        className="flex items-center gap-10 font-poppins text-18"
                        onClick={() => setPreviousStep()}
                    >
                        Porovnať so zhodujúcou stranou
                        <Chevron className="text-magenta" />
                    </a>
                </div>
            </section>
            <section
                className="absolute left-0 w-full overflow-x-scroll"
                {...bind()}
                ref={scrollRef}
            >
                <table className="border-separate border-spacing-0">
                    <thead className="bg-white">
                        <tr className="border-b">
                            <th className="min-w-[550px] border-r border-r bg-white" />
                            <th className="min-w-[170px] bg-white px-10 font-poppins text-18 font-bold md:py-30">
                                Tvoja odpoveď
                            </th>
                            {parties.map((party, i) => (
                                <th
                                    className="min-w-[170px] border-l px-10 md:py-30"
                                    key={i}
                                >
                                    <img
                                        src={party.logo}
                                        alt={party.party_name}
                                        title={party.party_name}
                                        className="mx-auto max-h-[35px]"
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => {
                            return (
                                <tr
                                    className={
                                        index % 2 === 0
                                            ? 'bg-white'
                                            : 'bg-z-row font-bold'
                                    }
                                >
                                    <td
                                        className={
                                            'bg-white py-30 pr-100' +
                                            (index % 2 === 0
                                                ? ''
                                                : ' bg-z-row font-bold')
                                        }
                                    >
                                        <div className="grid grid-cols-[74px_1fr]">
                                            <div className="w-[74px] text-right font-poppins text-18 font-bold text-magenta">
                                                {index + 1}
                                            </div>
                                            <div className="pl-20 font-poppins">
                                                {question.text}
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        className={classNames(
                                            'w-[170px] border-l border-r px-30 text-center',
                                            {
                                                'bg-white': index % 2 === 0,
                                                'bg-z-row': index % 2 !== 0,
                                            }
                                        )}
                                    >
                                        <AnswerTag answer={answers[index]} />
                                    </td>
                                    {parties.map((party, i) => {
                                        const currentParty = party.answers.find(
                                            (a) =>
                                                Number.parseInt(
                                                    a.question_id
                                                ) ===
                                                index + 1
                                        )
                                        return (
                                            <td
                                                className="w-1/6 border-l px-30 text-center"
                                                key={i}
                                            >
                                                <AnswerTag
                                                    answer={
                                                        currentParty?.answer_value ||
                                                        0
                                                    }
                                                    currentParty={currentParty}
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <ButtonsRow />
            </section>
        </div>
    )
}

export default AllParties
