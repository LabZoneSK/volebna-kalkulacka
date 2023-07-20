import React, { useState } from "react";
import { UserAnswersProps } from "../../@types";

const UserAnswers: React.FC<UserAnswersProps> = ({
  questions,
  politicalParties,
}) => {
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(0)
  );
  const [userMatchParty, setUserMatchParty] = useState<string | null>();
  const [matchingQuestions, setMatchingQuestions] = useState<string[]>([]);

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
        total +=
          (answer === partyAnswers[index] ? 1 : -1) * questions[index].weight;
        count += questions[index].weight;
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
        answers: partyAnswers,
      };
    });

    const bestMatchParty = distances.reduce((prev, current) => {
      return prev.compliance > current.compliance ? prev : current;
    });

    const matches = questions
      .filter(
        (_, index) =>
          answers[index] !== 0 &&
          answers[index] === bestMatchParty.answers[index]
      )
      .map((question) => question.text);

    setUserMatchParty(bestMatchParty.party_name);
    setMatchingQuestions(matches);
  };

  return (
    <div>
      <h1 className="font-poppins text-3xl font-bold underline text-center">
        Volebna kalkulacka
      </h1>
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
        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>
            Vyhodnotit
          </button>
          <button
            type="reset"
            onClick={() => setAnswers(new Array(questions.length).fill(0))}
          >
            Reset
          </button>
        </div>

        {userMatchParty && (
          <div>
            <p>
              Strana s najviac zhodnymi odpovedami: <b>{userMatchParty}</b>
            </p>
            {matchingQuestions.length > 0 && (
              <div>
                <p>Otázky, kde sa zhodnes so stranou:</p>
                <ul>
                  {matchingQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserAnswers;
