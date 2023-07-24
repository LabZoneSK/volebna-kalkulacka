import React from "react";
import classNames from "classnames";
import { AnswerButtonType } from "../../@types";

import { ReactComponent as Yes } from "../../assets/yes.svg";
import { ReactComponent as No } from "../../assets/no.svg";

interface AnswerButtonProps {
  type: AnswerButtonType;
  answer: number;
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  onClick,
  type,
  answer,
}) => {
  const borderColor =
    type === AnswerButtonType.YES ? "border-magenta" : "border-z-blue";

  const ButtonClass = classNames(
    "border rounded-full py-10 px-60",
    borderColor,
    {
      "text-magenta": type === AnswerButtonType.YES,
      "text-z-blue": type === AnswerButtonType.NO,
    },
    {
      "bg-magenta !text-white": answer === 1 && type === AnswerButtonType.YES,
      "bg-z-blue !text-white": answer === -1 && type === AnswerButtonType.NO,
    }
  );

  return (
    <button className={ButtonClass} onClick={onClick}>
      <div className="flex flex-row gap-50 items-center">
        {type === AnswerButtonType.YES ? (
          <>
            <Yes className="w-[24px]" />
            <span className="font-poppins font-bold text-18">Ano</span>{" "}
          </>
        ) : (
          <>
            <No className="w-[18px]" />
            <span className="font-poppins font-bold text-18">Nie</span>{" "}
          </>
        )}
      </div>
    </button>
  );
};

export default AnswerButton;