import Chevron from "../../assets/chevron.svg";
const Button = () => {
  return (
    <button className="bg-magenta rounded-full px-30 py-20 text-white font-poppins font-bold">
      <div className="flex gap-50">
        <span className="text-lg">Spustiť volebnú kalkulačku</span>
        <img src={Chevron} alt="chevron" />
      </div>
    </button>
  );
};

export default Button;
