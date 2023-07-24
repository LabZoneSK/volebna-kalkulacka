import { useSetAtom, useAtomValue } from "jotai";
import {
  answersAtom,
  questionsAtom,
  userMatchPartyAtom,
} from "./AnswersForm/answers.form.atoms";
import { nextStepAtom } from "./AppSteps/stepper.atoms";
import AnswerTag from "./AnswersForm/AnswerTag";
import { ReactComponent as Chevron } from "../assets/chevron.svg";

const UserMatchParty = () => {
  const questions = useAtomValue(questionsAtom);
  const setNextStep = useSetAtom(nextStepAtom);

  const answers = useAtomValue(answersAtom);
  const userMatchParty = useAtomValue(userMatchPartyAtom);

  return (
    <div className="mx-auto">
      <section className="w-full mt-62 mb-62 flex flex-row items-center">
        <h1 className="w-1/2 text-left font-poppins font-bold text-40 grow">
          Porovnanie so zhodujúcou stranou
        </h1>
        <div className="text-right">
          <a
            className="font-poppins text-18 flex items-center gap-10"
            onClick={() => setNextStep()}
          >
            Porovnať so všetkými stranami
            <Chevron className="text-magenta" />
          </a>
        </div>
      </section>
      <section>
        <table className="w-930">
          <thead>
            <tr className="border-b">
              <th className="border-r" />
              <th className="font-poppins font-bold text-18 py-30 px-10">
                Tvoja odpoveď
              </th>
              <th className="py-30 px-10 border-l">
                <img
                  src={userMatchParty?.logo}
                  alt={userMatchParty.party_name}
                  title={userMatchParty.party_name}
                  className="max-h-[35px] mx-auto"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr className={index % 2 === 0 ? "" : "bg-z-row font-bold"}>
                <td className="py-30 pr-100 border-r">
                  <div className="grid grid-cols-[74px_1fr]">
                    <div className="text-magenta text-18 font-poppins font-bold w-[74px] text-right">
                      {index + 1}
                    </div>
                    <div className="font-poppins pl-20">{question.text}</div>
                  </div>
                </td>
                <td className="w-1/6 text-center px-30">
                  <AnswerTag answer={answers[index]} />
                </td>
                <td className="w-1/6 text-center px-30 border-l">
                  <AnswerTag answer={userMatchParty.answers[index]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserMatchParty;
