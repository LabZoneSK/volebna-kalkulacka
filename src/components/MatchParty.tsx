import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  userMatchPartyAtom,
  matchingQuestionsAtom,
  questionsAtom,
} from "./AnswersForm/answers.form.atoms";
import { nextStepAtom } from "./AppSteps/stepper.atoms";
import Button from "./common/Button";

const MatchParty: React.FC = () => {
  const userMatchParty = useAtomValue(userMatchPartyAtom);
  const matchingQuestions = useAtomValue(matchingQuestionsAtom);
  const questions = useAtomValue(questionsAtom);
  const showNext = useSetAtom(nextStepAtom);

  console.log(userMatchParty);

  return (
    <div className="mx-auto">
      <section className="w-full mt-62 mb-62">
        <h1 className="font-poppins font-bold text-40 text-center">
          Tvoje hodnoty sa najviac (
          {Math.round((matchingQuestions.length / questions.length) * 100)}%)
          <br />
          zhodujú so stranou:
        </h1>
      </section>

      <div className="mb-80">
        <section
          className={`text-center border border-light-grey rounded-cool shadow-custom-light backdrop-blur bg-white bg-opacity-90 w-930 py-77 px-100 flex flex-col items-center`}
        >
          <img
            src={userMatchParty?.logo}
            alt=""
            className="mb-50 max-h-[100px]"
          />
          <h1 className="font-popping text-30 mb-60">
            {userMatchParty?.party_name}
          </h1>
          <Button
            label="Porovnaj si odpovede"
            handleClick={() => {
              showNext();
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default MatchParty;
