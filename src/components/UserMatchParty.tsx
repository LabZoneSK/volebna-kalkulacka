import { useAtomValue } from "jotai";
import {
  answersAtom,
  questionsAtom,
  userMatchPartyAtom,
} from "./AnswersForm/answers.form.atoms";
import AnswerTag from "./AnswersForm/AnswerTag";
const UserMatchParty = () => {
  const questions = useAtomValue(questionsAtom);

  const answers = useAtomValue(answersAtom);
  const userMatchParty = useAtomValue(userMatchPartyAtom);

  return (
    <div className="mx-auto">
      <section className="w-full mt-62 mb-62 flex flex-row items-center">
        <h1 className="w-1/2 text-left font-poppins font-bold text-40">
          Porovnanie so zhodujúcou stranou
        </h1>
        <div className="">
          <span className="font-poppins text-18">
            Porovnať so všetkými stranami
          </span>
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
              <th className="font-poppins font-bold text-18 py-30 px-10">
                {userMatchParty?.party_name}
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr className={index % 2 === 0 ? "" : "bg-z-row font-bold"}>
                <td className="py-30 pr-100 border-r">
                  <div className="flex">
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
