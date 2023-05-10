import UserAnswers from "./components/AnswersForm/AnswersForm";
import { politicalPartiesStub, questionsStub } from "./components/stubs";
import "./App.css";

function App() {
  return (
    <UserAnswers
      questions={questionsStub}
      politicalParties={politicalPartiesStub}
    />
  );
}

export default App;
