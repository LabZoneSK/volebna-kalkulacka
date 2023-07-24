import { useSetAtom, useAtomValue } from "jotai";
import classNames from "classnames";
import {
  partiesAtom,
  questionsAtom,
  answersAtom,
  userMatchPartyAtom,
} from "./AnswersForm/answers.form.atoms";
import { prevStepAtom } from "./AppSteps/stepper.atoms";
import AnswerTag from "./AnswersForm/AnswerTag";
import { ReactComponent as Chevron } from "../assets/chevron.svg";

const AllParties = () => {
  const questions = useAtomValue(questionsAtom);
  const setPreviousStep = useSetAtom(prevStepAtom);

  const answers = useAtomValue(answersAtom);
  const parties = useAtomValue(partiesAtom);

  return (
    <div className="mx-auto overflow-hidden">
      <section className="w-full mt-62 mb-62 flex flex-row items-center">
        <h1 className="w-1/2 text-left font-poppins font-bold text-40 grow">
          Porovnanie so všetkými stranami
        </h1>
        <div className="text-right">
          <a
            className="font-poppins text-18 flex items-center gap-10"
            onClick={() => setPreviousStep()}
          >
            Porovnať so zhodujúcou stranou
            <Chevron className="text-magenta" />
          </a>
        </div>
      </section>
      <section className="overflow-x-scroll">
        <table className="table-fixed border-separate border-spacing-0">
          <thead>
            <tr className="border-b">
              <th className="sticky left-0 min-w-[550px] border-r border-r bg-white z-10" />
              <th className="sticky left-[550px] bg-white min-w-[170px] font-poppins font-bold text-18 py-30 px-10">
                Tvoja odpoveď
              </th>
              {parties.map((party, i) => (
                <th className="min-w-[170px] py-30 px-10 border-l" key={i}>
                  <img
                    src={party.logo}
                    alt={party.party_name}
                    title={party.party_name}
                    className="max-h-[35px] mx-auto"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr className={index % 2 === 0 ? "" : "bg-z-row font-bold"}>
                <td
                  className={
                    "sticky left-0 py-30 pr-100 bg-white" +
                    (index % 2 === 0 ? "" : " bg-z-row font-bold")
                  }
                >
                  <div className="grid grid-cols-[74px_1fr]">
                    <div className="text-magenta text-18 font-poppins font-bold w-[74px] text-right">
                      {index + 1}
                    </div>
                    <div className="font-poppins pl-20">{question.text}</div>
                  </div>
                </td>
                <td
                  className={classNames(
                    "sticky left-[550px] text-center px-30 w-[170px] border-l border-r",
                    {
                      "bg-white": index % 2 === 0,
                      "bg-z-row": index % 2 !== 0,
                    }
                  )}
                >
                  <AnswerTag answer={answers[index]} />
                </td>
                {parties.map((party, i) => (
                  <td className="w-1/6 text-center px-30 border-l" key={i}>
                    <AnswerTag
                      answer={
                        party.answers.find(
                          (a) => Number.parseInt(a.question_id) === index
                        )?.answer_value || 0
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AllParties;
