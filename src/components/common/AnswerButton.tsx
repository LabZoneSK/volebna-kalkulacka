import React from "react";
import { AnswerButtonType } from "../../@types";

import yes from "../../assets/yes.svg";
import no from "../../assets/no.svg";

interface AnswerButtonProps {
  type: AnswerButtonType;
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ onClick, type }) => {
  const borderColor =
    type === AnswerButtonType.YES ? "border-magenta" : "border-z-blue";

  return (
    <button
      className={`border rounded-full py-10 px-60 ${borderColor}`}
      onClick={onClick}
    >
      <div className="flex flex-row gap-50">
        {type === AnswerButtonType.YES ? (
          <>
            <img src={yes} alt="" className="w-[24px]" />
            <span className="font-poppins font-bold text-18">Ano</span>{" "}
          </>
        ) : (
          <>
            <img src={no} alt="" className="w-[18px]" />
            <span className="font-poppins font-bold text-18">Nie</span>{" "}
          </>
        )}
      </div>
    </button>
  );
};

export default AnswerButton;
