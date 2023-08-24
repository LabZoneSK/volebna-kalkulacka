import { useAtom } from 'jotai'
import { currentStepAtom } from './stepper.atoms'
import Welcome from '../Welcome'
import Intro from '../Intro'
import Start from '../Start'
import Calculator from '../Calculator'
import Summary from '../Summary'
import MatchParty from '../MatchParty'
import UserMatchParty from '../UserMatchParty'
import AllParties from '../AllParties'

const AppStepsWrapper = () => {
    const [currentStep] = useAtom(currentStepAtom) // Use the currentStep atom

    const steps = [
        <Welcome />,
        <Intro />,
        <Start />,
        <Calculator />,
        <Summary />,
        <MatchParty />,
        <UserMatchParty />,
        <AllParties />,
    ]

    return (
        <div className="mx-auto w-full overflow-hidden px-3 md:w-960 md:px-0">
            {steps[currentStep]}
        </div>
    )
}

export default AppStepsWrapper
