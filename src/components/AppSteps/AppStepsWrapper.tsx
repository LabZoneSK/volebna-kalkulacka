import { useAtom } from "jotai";
import { currentStepAtom } from "./stepper.atoms";
import Welcome from "../Welcome";
import Intro from "../Intro";
import Start from "../Start";
import Calculator from "../Calculator";
import Summary from "../Summary";
import MatchParty from "../MatchParty";
import UserMatchParty from "../UserMatchParty";

const AppStepsWrapper = () => {
  const [currentStep] = useAtom(currentStepAtom); // Use the currentStep atom

  const steps = [
    <Welcome />,
    <Intro />,
    <Start />,
    <Calculator />,
    <Summary />,
    <MatchParty />,
    <UserMatchParty />,
  ];

  return <div className="mx-auto w-960">{steps[currentStep]}</div>;
};

export default AppStepsWrapper;
