import StepWrapper from "./AppSteps/StepWrapper";

import UserAnswers from "./AnswersForm/AnswersForm";
import useFetchQuestions from "../data/useFetchQuestions";
import useFetchAnswers from "../data/useFetchAnswers";

const Calculator = () => {
  const { loading, questions } = useFetchQuestions();
  const { parties } = useFetchAnswers();

  return (
    <StepWrapper>
      {loading ? (
        <p>Please, wait</p>
      ) : (
        <UserAnswers questions={questions} politicalParties={parties} />
      )}
    </StepWrapper>
  );
};

export default Calculator;
