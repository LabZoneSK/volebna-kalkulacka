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

const AllParties = () => {
    const questions = useAtomValue(questionsAtom)
    const setPreviousStep = useSetAtom(prevStepAtom)

    const answers = useAtomValue(answersAtom)
    const parties = useAtomValue(partiesAtom)

    return (
        <div className="mx-auto overflow-hidden">
            <section className="mb-62 mt-62 flex w-full flex-row items-center">
                <h1 className="w-1/2 grow text-left font-poppins text-40 font-bold">
                    Porovnanie so všetkými stranami
                </h1>
                <div className="text-right">
                    <a
                        className="flex items-center gap-10 font-poppins text-18"
                        onClick={() => setPreviousStep()}
                    >
                        Porovnať so zhodujúcou stranou
                        <Chevron className="text-magenta" />
                    </a>
                </div>
            </section>
            <section className="overflow-x-scroll">
                <table className="table-fixed border-separate border-spacing-0">
                    <thead>
                        <tr className="border-b">
                            <th className="sticky left-0 z-10 min-w-[550px] border-r border-r bg-white" />
                            <th className="sticky left-[550px] min-w-[170px] bg-white px-10 py-30 font-poppins text-18 font-bold">
                                Tvoja odpoveď
                            </th>
                            {parties.map((party, i) => (
                                <th
                                    className="min-w-[170px] border-l px-10 py-30"
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
                                            ? ''
                                            : 'bg-z-row font-bold'
                                    }
                                >
                                    <td
                                        className={
                                            'sticky left-0 bg-white py-30 pr-100' +
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
                                            'sticky left-[550px] w-[170px] border-l border-r px-30 text-center',
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
                                                ) === index
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
            </section>

            <ButtonsRow />
        </div>
    )
}

export default AllParties
