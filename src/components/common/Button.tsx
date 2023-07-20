import React from "react";
import Chevron from "../../assets/chevron.svg";
interface ButtonProps {
  handleClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, label }) => {
  return (
    <button
      className="bg-magenta rounded-full px-30 py-20 text-white font-poppins font-bold"
      onClick={handleClick}
    >
      <div className="flex gap-50">
        <span className="text-lg">{label}</span>
        <img src={Chevron} alt="chevron" />
      </div>
    </button>
  );
};

export default Button;
