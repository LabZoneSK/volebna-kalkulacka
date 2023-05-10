import React, { useState } from "react";
import { PoliticalParty } from "../../@types";

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
  const [userMatchParty, setUserMatchParty] = useState<string | null>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(event.target.value);
    setAnswers(newAnswers);
  };

  const calculateCompliance = (
    userAnswers: number[],
    partyAnswers: number[]
  ): number => {
    let total = 0;
    let count = 0;

    userAnswers.forEach((answer, index) => {
      if (answer !== 0) {
        total += answer === partyAnswers[index] ? 1 : -1;
        count++;
      }
    });

    return (total / count / 2 + 0.5) * 100;
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
        compliance: calculateCompliance(answers, partyAnswers),
      };
    });

    const bestMatchParty = distances.reduce((prev, current) => {
      return prev.compliance > current.compliance ? prev : current;
    });

    setUserMatchParty(bestMatchParty.party_name);
  };

  return (
    <div>
      <h1>Election Calculator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((question, index) => (
          <div key={question.question_id}>
            <p>{question.text}</p>
            <input
              type="radio"
              name={`question_${question.question_id}`}
              value="1"
              checked={answers[index] === 1}
              onChange={(e) => handleChange(e, index)}
            />{" "}
            Ano
            <input
              type="radio"
              name={`question_${question.question_id}`}
              value="-1"
              checked={answers[index] === -1}
              onChange={(e) => handleChange(e, index)}
            />{" "}
            Nie
            <input
              type="radio"
              name={`question_${question.question_id}`}
              value="0"
              checked={answers[index] === 0}
              onChange={(e) => handleChange(e, index)}
            />{" "}
            Neviem
          </div>
        ))}
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>

        {userMatchParty && (
          <p>Strana s najviac zhodnymi odpovedami: {userMatchParty}</p>
        )}
      </form>
    </div>
  );
};

export default UserAnswers;
