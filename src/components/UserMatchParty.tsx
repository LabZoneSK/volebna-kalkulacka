import { useSetAtom, useAtomValue } from 'jotai'
import {
    answersAtom,
    questionsAtom,
    userMatchPartyAtom,
} from './AnswersForm/answers.form.atoms'
import { nextStepAtom } from './AppSteps/stepper.atoms'
import AnswerTag from './AnswersForm/AnswerTag'
import { ReactComponent as Chevron } from '../assets/chevron.svg'
import ButtonsRow from './common/ButtonsRow'

const UserMatchParty = () => {
    const questions = useAtomValue(questionsAtom)
    const setNextStep = useSetAtom(nextStepAtom)

    const answers = useAtomValue(answersAtom)
    const userMatchParty = useAtomValue(userMatchPartyAtom)

    return (
        <div className="mx-auto">
            <section className="mb-62 mt-62 flex w-full flex-col items-start md:flex-row md:items-center">
                <h1 className="w-full grow text-left font-poppins text-3xl font-bold md:w-1/2 md:text-40">
                    Porovnanie so zhodujúcou stranou
                </h1>
                <div className="mt-4 text-right md:mt-0">
                    <a
                        className="flex items-center gap-10 font-poppins text-18"
                        onClick={() => setNextStep()}
                    >
                        Porovnať so všetkými stranami
                        <Chevron className="text-magenta" />
                    </a>
                </div>
            </section>
            <section>
                <table className="w-full md:w-930">
                    <thead className="bg-white">
                        <tr className="border-b">
                            <th className="border-r" />
                            <th className="px-10 py-30 font-poppins text-18 font-bold">
                                Tvoja odpoveď
                            </th>
                            <th className="border-l px-10 py-30">
                                <img
                                    src={userMatchParty?.logo}
                                    alt={userMatchParty.party_name}
                                    title={userMatchParty.party_name}
                                    className="mx-auto max-h-[35px]"
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr
                                className={
                                    index % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-z-row font-bold'
                                }
                            >
                                <td className="border-r py-30 md:pr-100">
                                    <div className="flex md:grid md:grid-cols-[74px_1fr]">
                                        <div className="w-[74px] text-right font-poppins text-18 font-bold text-magenta">
                                            {index + 1}
                                        </div>
                                        <div className="pl-20 font-poppins">
                                            {question.text}
                                        </div>
                                    </div>
                                </td>
                                <td className="w-1/6 px-30 text-center">
                                    <AnswerTag answer={answers[index]} />
                                </td>
                                <td className="relative w-1/6 border-l px-30 text-center">
                                    <AnswerTag
                                        answer={userMatchParty.answers[index]}
                                        currentParty={userMatchParty}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <ButtonsRow />
        </div>
    )
}

export default UserMatchParty
