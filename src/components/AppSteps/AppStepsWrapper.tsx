import { useAtom } from 'jotai'
import { lazy, Suspense } from 'react'
import { currentStepAtom } from './stepper.atoms'

/** Components */
const Welcome = lazy(() => import('../Welcome'))
const Intro = lazy(() => import('../Intro'))
const Start = lazy(() => import('../Start'))
const Calculator = lazy(() => import('../Calculator'))
const Summary = lazy(() => import('../Summary'))
const MatchParty = lazy(() => import('../MatchParty'))
const UserMatchParty = lazy(() => import('../UserMatchParty'))
const AllParties = lazy(() => import('../AllParties'))

const Loading = () => <div>Loading...</div>
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
        <Suspense fallback={<Loading />}>
            <div className="mx-auto w-full px-3 md:w-960 md:px-0">
                {steps[currentStep]}
            </div>
        </Suspense>
    )
}

export default AppStepsWrapper
