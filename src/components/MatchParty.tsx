import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
    userMatchPartyAtom,
    matchingQuestionsAtom,
    questionsAtom,
} from './AnswersForm/answers.form.atoms'
import { nextStepAtom } from './AppSteps/stepper.atoms'
import Button from './common/Button'
import ButtonsRow from './common/ButtonsRow'
import { ReactComponent as Chevron } from '../assets/chevron.svg'

const MatchParty: React.FC = () => {
    const userMatchParty = useAtomValue(userMatchPartyAtom)
    const matchingQuestions = useAtomValue(matchingQuestionsAtom)
    const questions = useAtomValue(questionsAtom)
    const showNext = useSetAtom(nextStepAtom)
    const [showInfo, setShowInfo] = React.useState<boolean>(false)

    if (showInfo) {
        return (
            <div className="mx-auto">
                <section className="mb-62 mt-62 w-full">
                    <h1 className="text-center font-poppins text-3xl font-bold md:text-40">
                        Ako sme kalkulačku vytvorili
                    </h1>
                </section>

                <div className="mb-80">
                    <section
                        className={`flex w-full flex-col items-start rounded-cool border border-light-grey bg-white bg-opacity-90 px-6 py-77 text-left shadow-custom-light backdrop-blur md:w-930 md:px-100`}
                    >
                        <p className="mb-2 font-bold">
                            Volebnú kalkulačku vytvorilo Zmudri.
                        </p>
                        <p className="mb-2">
                            S otázkami do volebnej kalkulačky sme oslovovali
                            strany, ktoré mali podľa prieskumov na začiatku júla
                            2023 preferencie nad 3 %.
                        </p>
                        <p className="mb-2">
                            Pri tvorbe otázok nám pomáhali odborníci na
                            jednotlivé oblasti aj novinári, ktorí sa týmto
                            oblastiam venujú. Otázky sme pri ich formulovaní
                            konzultovali s Martinom Smatanom (zdravotníctvo),
                            Erikom Balážom (ekológia a životné prostredie), Evou
                            Frantovou (sociálne a ekonomické oblasti), Jánom
                            Ivančíkom (spravodlivosť a právny štát), Lukášom
                            Dikom (mediálna oblasť) a Tomášom Strážayom
                            (zahraničná politika).
                        </p>
                        <p className="mb-2">
                            Na naše otázky odpovedali tieto politické strany a
                            hnutia: Hlas, PS, Republika, SASKA, KDH, SNS,
                            Demokrati. Neodpovedali nám OĽANO, Smer-SSD a Sme
                            rodina. Pri stranách, ktoré nám neodpovedali, sme
                            pri tvorbe kalkulačky vychádzali z ich volebných
                            programov, hlasovaní v NR SR a verejných vyjadrení
                            ich predstaviteľov. Oslovili sme aj stranu Aliancia,
                            ktorá však na naše otázky neodpovedala a neposkytla
                            nám ani svoj program v slovenskom jazyku.
                        </p>
                        <p className="mb-2">
                            Volebná kalkulačka vypočíta názorovú zhodu, pričom
                            dá vyššiu váhu otázkam, ktoré vyplníte ako dôležité
                            a naopak neberie do úvahy tie, ktoré označíte ako
                            pre vás nepodstatné. Je čisto informatívna a jej
                            cieľom nie je dávať konkrétne odporúčania, koho
                            voliť. Zároveň nezbiera a neukladá dáta o vašich
                            odpovediach.
                        </p>

                        <div className="mt-10 self-center">
                            <Button
                                handleClick={() => setShowInfo(false)}
                                label="Vrátiť sa späť"
                            />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
    return (
        <div className="mx-auto">
            <section className="mb-62 mt-62 w-full">
                <h1 className="text-center font-poppins text-3xl font-bold md:text-40">
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
                    className={`flex w-full flex-col items-center rounded-cool border border-light-grey bg-white bg-opacity-90 px-6 py-77 text-center shadow-custom-light backdrop-blur md:w-930 md:px-100`}
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

            <ButtonsRow />
            <div className="mb-30 flex w-full justify-center">
                <button
                    onClick={() => setShowInfo(true)}
                    className="flex items-center"
                >
                    Ako sme kalkulačku vytvorili
                    <Chevron className="ml-30 text-magenta" />
                </button>
            </div>
        </div>
    )
}

export default MatchParty
