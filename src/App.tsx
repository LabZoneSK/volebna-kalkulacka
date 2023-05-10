import UserAnswers from "./components/AnswersForm/AnswersForm";
import { Question, PoliticalParty } from "./@types";
import "./App.css";

const questionsStub: Question[] = [
  {
    question_id: "1",
    text: "Som za vystupenie z NATO",
  },
  {
    question_id: "2",
    text: "Som za posilnenie prav LGBTI+ komunity",
  },
  {
    question_id: "3",
    text: "Podporujem EU a jej rozsirovanie",
  },
];

const politicalPartiesStub: PoliticalParty[] = [
  {
    party_id: "1",
    party_name: "LSNS",
    answers: [
      { question_id: "1", answer_value: 1 },
      { question_id: "2", answer_value: -1 },
      { question_id: "3", answer_value: -1 },
    ],
  },
  {
    party_id: "2",
    party_name: "SAS",
    answers: [
      { question_id: "1", answer_value: -1 },
      { question_id: "2", answer_value: 1 },
      { question_id: "3", answer_value: 1 },
    ],
  },
  {
    party_id: "3",
    party_name: "KDH",
    answers: [
      { question_id: "1", answer_value: -1 },
      { question_id: "2", answer_value: 0 },
      { question_id: "3", answer_value: 1 },
    ],
  },
];

function App() {
  return (
    <>
      <UserAnswers
        questions={questionsStub}
        politicalParties={politicalPartiesStub}
      />
    </>
  );
}

export default App;
