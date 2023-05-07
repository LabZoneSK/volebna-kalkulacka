import React, { useState } from "react";
import { PoliticalParty } from "../../App";

interface Question {
  question_id: string;
  text: string;
}

interface UserAnswersProps {
  questions: Question[];
  politicalParties: PoliticalParty[];
}

const UserAnswers: React.FC<UserAnswersProps> = ({
  questions,
  politicalParties,
}) => {
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(0)
  );
  const [prefferedParty, setClosestParty] = useState<any>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseFloat(event.target.value);
    setAnswers(newAnswers);
  };

  const calculateEuclideanDistance = (
    userAnswers: number[],
    partyAnswers: number[]
  ): number => {
    const squaredDifferences = userAnswers.map((answer, index) => {
      return Math.pow(answer - partyAnswers[index], 2);
    });

    return Math.sqrt(squaredDifferences.reduce((sum, diff) => sum + diff, 0));
  };

  const handleSubmit = () => {
    const distances = politicalParties.map((party) => {
      const partyAnswers = questions.map((question) => {
        const answer = party.answers.find(
          (a) => a.question_id === question.question_id
        );
        return answer ? answer.answer_value : 0;
      });

      return {
        party_id: party.party_id,
        party_name: party.party_name,
        distance: calculateEuclideanDistance(answers, partyAnswers),
      };
    });

    const closestParty = distances.reduce((prev, current) => {
      return prev.distance < current.distance ? prev : current;
    });

    setClosestParty(closestParty.party_name);
  };

  return (
    <div>
      <h1>Volebna kalkulacka</h1>
      <p>
        Na kolko sa stotoznujes s tymito vyhlaseniami?
        <br />
        0% = absolutne nie
        <br />
        50% = nemam nazor
        <br />
        100% = absolutne ano
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((question, index) => (
          <div key={question.question_id}>
            <p>{question.text}</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={answers[index]}
              onChange={(e) => handleChange(e, index)}
            />
            <span>{(answers[index] * 100).toFixed(0)}%</span>
          </div>
        ))}
        <button type="submit" onClick={handleSubmit}>
          Vyhodnotit
        </button>
      </form>
      {prefferedParty?.length > 0 && (
        <p>
          Na zaklade tvojich odpovedi, je strana <b>{prefferedParty}</b>{" "}
          najblizsie k tvojim hodnotam
        </p>
      )}
    </div>
  );
};

export default UserAnswers;
