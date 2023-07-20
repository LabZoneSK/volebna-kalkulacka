import React from "react";
import classNames from "classnames";

import { getResponseText } from "../../helpers/answers";
interface AnswerTagProps {
  answer: number;
}

const AnswerTag: React.FC<AnswerTagProps> = ({ answer }) => {
  const TagClass = classNames(
    "flex gap-20 items-center justify-center rounded-full py-10 text-center font-bold font-poppins",
    {
      "bg-magenta text-white": answer === 1,
      "bg-z-blue text-white": answer === -1,
    }
  );
  return (
    <div className={TagClass}>
      <span className="font-poppins text-18 text-left">
        {getResponseText(answer)}
      </span>
    </div>
  );
};

export default AnswerTag;
