import AppStepsWrapper from "./components/AppSteps/AppStepsWrapper";

const App = () => {
  return <AppStepsWrapper />;
};

/*
import UserAnswers from "./components/AnswersForm/AnswersForm";
import useFetchQuestions from "./data/useFetchQuestions";
import useFetchAnswers from "./data/useFetchAnswers";

function App() {
  const { loading, data: questions } = useFetchQuestions();
  const { data: answers } = useFetchAnswers();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <UserAnswers questions={questions} politicalParties={answers} />;
}


*/
export default App;
