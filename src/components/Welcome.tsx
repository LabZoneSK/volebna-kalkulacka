import Button from './common/Button'
import { nextStepAtom } from './AppSteps/stepper.atoms'
import { questionsFormActiveAtom } from './AnswersForm/answers.form.atoms'
import { useAtom, useSetAtom } from 'jotai'

const Welcome = () => {
    const [, setNextStep] = useAtom(nextStepAtom)
    const questionsFormActive = useSetAtom(questionsFormActiveAtom)

    questionsFormActive(false)

    return (
        <div className="mx-auto w-full md:w-930">
            <section className="flex w-full flex-col-reverse items-center md:flex-row">
                <h1 className="w-2/3 font-poppins text-50 font-bold md:w-1/2">
                    Zisti, koho voliť podľa{' '}
                    <span className="text-magenta">tvojich hodnôt</span>!
                </h1>
                <img
                    src="/images/nadej.png"
                    alt=""
                    className="w-2/3 md:w-[455px]"
                />
            </section>

            <section className="rounded-cool border border-light-grey px-100 py-77 text-center shadow-custom-light backdrop-blur">
                <h2 className="mb-10 text-center font-poppins text-34 font-bold uppercase text-magenta">
                    Nevyberaj ľudí, voľ hodnoty!
                </h2>
                <p className="mb-50 font-poppins">
                    Niekedy je veľmi ťažké vybrať si tú správnu politickú
                    stranu. Chápeme.
                    <br />
                    Veríme však, že hodnoty máš celkom jasné. Práve preto sme v{' '}
                    <b>Zmudri G</b>
                    <br />
                    pripravili <b>volebnú kalkulačku</b> pre každého mladého
                    človeka.
                </p>
                <Button
                    handleClick={() => setNextStep()}
                    label="Spustiť volebnú kalkulačku"
                />
            </section>
        </div>
    )
}

export default Welcome
