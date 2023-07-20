import Button from "./common/Button";
import StepWrapper from "./AppSteps/StepWrapper";
import { nextStepAtom } from "./AppSteps/stepper.atoms";
import { useAtom } from "jotai";
import UserAnswers from "./AnswersForm/AnswersForm";
import useFetchQuestions from "../data/useFetchQuestions";
import useFetchAnswers from "../data/useFetchAnswers";

const Calculator = () => {
  const [, setNextStep] = useAtom(nextStepAtom);
  const { loading, data: questions } = useFetchQuestions();
  const { data: answers } = useFetchAnswers();

  return (
    <StepWrapper>
      {loading ? (
        <p>Please, wait</p>
      ) : (
        <UserAnswers questions={questions} politicalParties={answers} />
      )}
    </StepWrapper>
  );
};

export default Calculator;
