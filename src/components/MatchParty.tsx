import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
    userMatchPartyAtom,
    matchingQuestionsAtom,
    questionsAtom,
} from './AnswersForm/answers.form.atoms'
import { nextStepAtom } from './AppSteps/stepper.atoms'
import Button from './common/Button'

const MatchParty: React.FC = () => {
    const userMatchParty = useAtomValue(userMatchPartyAtom)
    const matchingQuestions = useAtomValue(matchingQuestionsAtom)
    const questions = useAtomValue(questionsAtom)
    const showNext = useSetAtom(nextStepAtom)

    return (
        <div className="mx-auto">
            <section className="mb-62 mt-62 w-full">
                <h1 className="text-center font-poppins text-40 font-bold">
                    Tvoje hodnoty sa najviac (
                    {Math.round(
                        (matchingQuestions.length / questions.length) * 100
                    )}
                    %)
                    <br />
                    zhodujú so stranou:
                </h1>
            </section>

            <div className="mb-80">
                <section
                    className={`flex w-930 flex-col items-center rounded-cool border border-light-grey bg-white bg-opacity-90 px-100 py-77 text-center shadow-custom-light backdrop-blur`}
                >
                    <img
                        src={userMatchParty?.logo}
                        alt=""
                        className="mb-50 max-h-[100px]"
                    />
                    <h1 className="font-popping mb-60 text-30">
                        {userMatchParty?.party_name}
                    </h1>
                    <Button
                        label="Porovnaj si odpovede"
                        handleClick={() => {
                            showNext()
                        }}
                    />
                </section>
            </div>
        </div>
    )
}

export default MatchParty
