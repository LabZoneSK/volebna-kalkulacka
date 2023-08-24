import { useCallback } from 'react'
import Button from './Button'
import { ButtonType } from '../../@types'
import { ReactComponent as Share } from '../../assets/share.svg'
import { ReactComponent as Chevron } from '../../assets/chevron.svg'
import { currentStepAtom } from '../AppSteps/stepper.atoms'
import { currentQuestionAtom } from '../AnswersForm/answers.form.atoms'
import { useSetAtom } from 'jotai'

const ButtonsRow = () => {
    const setStep = useSetAtom(currentStepAtom)
    const setCurrentQuestion = useSetAtom(currentQuestionAtom)

    const resetApp = useCallback(() => {
        setStep(0)
        setCurrentQuestion(0)
    }, [setCurrentQuestion, setStep])

    const shareResults = () => {
        console.log('share results')
        //TODO: share results
    }

    return (
        <section className="my-50 flex flex-col justify-center gap-20 md:flex-row md:gap-80">
            <Button
                handleClick={resetApp}
                label="Spustiť kalkulačku znova"
                type={ButtonType.SECONDARY}
                icon={<Chevron className="text-magenta" />}
            />
            <div className="hidden">
                <Button
                    handleClick={() => shareResults()}
                    label="Zdieľaj svoj výsledok"
                    type={ButtonType.SECONDARY}
                    color="z-blue"
                    icon={<Share />}
                />
            </div>
        </section>
    )
}

export default ButtonsRow
