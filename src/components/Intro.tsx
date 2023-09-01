import Button from './common/Button'
import StepWrapper from './AppSteps/StepWrapper'
import { nextStepAtom } from './AppSteps/stepper.atoms'
import { useAtom } from 'jotai'

const Intro = () => {
    const [, setNextStep] = useAtom(nextStepAtom)
    return (
        <StepWrapper>
            <p className="mb-6 font-poppins">
                Opýtame sa ťa <b>29 otázok</b>, ktoré trápia mladých.
            </p>
            <p className="mb-62 font-poppins">
                Odpovedať môžeš <b>Áno, Nie</b>, otázku označiť za{' '}
                <b>Dôležitú</b> alebo ju <b>Preskočiť</b>.<br />
                Vtedy tému vyhodnotíme ako pre teba nepodstatnú a vôbec ju
                nezarátame do výsledku.
            </p>

            <Button
                handleClick={() => {
                    setNextStep()
                }}
                label="Poďme ďalej"
            />
        </StepWrapper>
    )
}

export default Intro
