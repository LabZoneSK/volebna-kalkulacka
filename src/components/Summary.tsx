import React from "react";
import Star from "../assets/star.svg";
import classNames from "classnames";
import { useState, useRef, useEffect } from "react";

import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { questionsAtom, answersAtom } from "./AnswersForm/answers.form.atoms";
import { nextStepAtom } from "./AppSteps/stepper.atoms";
import { Question } from "../@types";
import Chevron from "../assets/chevron-white.svg";
import { ReactComponent as Thumb } from "../assets/thumb.svg";
import { ReactComponent as Yes } from "../assets/yes.svg";
import { ReactComponent as No } from "../assets/no.svg";
import Button from "./common/Button";

import { getResponseText } from "../helpers/answers";

interface AnswerRowProps {
  question: Question;
  answer: number;
  index: number;
  handleAnswerChange: (index: number, answer: number) => void;
}

const AnswerRow: React.FC<AnswerRowProps> = ({
  question,
  index,
  answer,
  handleAnswerChange,
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const answerClass = classNames(
    "relative h-[95px] py-20 px-30 bg-magenta flex flex-col justify-center rounded-r-cool",
    {
      "bg-magenta": answer === 1,
      "bg-z-gray": answer === 0,
      "bg-z-blue": answer === -1,
    }
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-[75px_1fr_140px] w-full items-center border border-light-grey rounded-cool relative">
      <div className="border-r h-full">
        <img src={Star} alt="" className="pl-30 py-30" />
      </div>
      <div className="flex-grow py-20 px-30 border-r flex items-center">
        <div className="font-poppins font-bold text-26 text-magenta w-[39px] text-center">
          {index + 1}
        </div>
        <div className="font-poppins font-bold text-18 pl-20">
          {question.text}
        </div>
      </div>
      <div className={answerClass} ref={ref}>
        <button
          className="flex items-center gap-20"
          onClick={() => setShow(!show)}
        >
          <div className="font-poppins font-bold text-white">
            {getResponseText(answer)}
          </div>
          <img src={Chevron} alt="" />
        </button>

        {show && (
          <div className="absolute top-0 z-50 w-56 mt-80 -translate-x-[55px] left-1/2 bg-white rounded-[10px] shadow-lg">
            <svg
              width="26px"
              height="26px"
              viewBox="0 0 37 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-12px] left-[62px]"
            >
              <path
                d="M16.263,1.121c1.172,-1.171 3.071,-1.171 4.243,0l16.264,16.264l-36.77,-0l16.263,-16.264Z"
                fill="#fff"
              />
            </svg>

            <button
              className="w-full px-30 text-center hover:bg-z-hover hover:font-bold py-20 px-30"
              onClick={() => {
                handleAnswerChange(index, 1);
                setShow(false);
              }}
            >
              <div className="flex gap-20 items-center">
                <Yes className="w-[18px] text-magenta" />
                <span className="font-poppins text-18 text-left">Ano</span>
              </div>
            </button>
            <button
              className="w-full px-30 text-center hover:bg-z-hover hover:font-bold py-20 px-30"
              onClick={() => {
                handleAnswerChange(index, -1);
                setShow(false);
              }}
            >
              <div className="flex gap-20 items-center">
                <No className="w-[18px] text-z-blue" />
                <span className="font-poppins text-18 text-left">Nie</span>
              </div>
            </button>
            <button
              className="px-30 text-center hover:bg-z-hover hover:font-bold py-20 px-30"
              onClick={() => {
                handleAnswerChange(index, 0);
                setShow(false);
              }}
            >
              <div className="flex gap-20 items-center">
                <Thumb className="w-[28px]" />
                <span className="font-poppins text-18 text-left">
                  Nie je to pre mňa dôležité
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Summary = () => {
  const questions = useAtomValue(questionsAtom);
  const [answers, setAnswers] = useAtom(answersAtom);
  const setNextStep = useSetAtom(nextStepAtom);

  return (
    <div className="mx-auto">
      <section className="w-full mt-62 mb-62">
        <h1 className="font-poppins font-bold text-40 text-center">
          Takéto sú tvoje odpovede.
          <br />
          Chceš niečo zmeniť?
        </h1>
      </section>
      <section className="w-930 mx-auto mb-80">
        <div className="flex flex-col gap-20 ">
          {questions.map((question, index) => (
            <AnswerRow
              key={index}
              question={question}
              index={index}
              answer={answers[index]}
              handleAnswerChange={(index, answer) => {
                setAnswers((prev) => {
                  const newAnswers = [...prev];
                  newAnswers[index] = answer;
                  return newAnswers;
                });
              }}
            />
          ))}
        </div>
      </section>
      <section className="w-full text-center mb-100">
        <Button label="Zobraziť výsledky" handleClick={() => setNextStep()} />
      </section>
    </div>
  );
};

export default Summary;
