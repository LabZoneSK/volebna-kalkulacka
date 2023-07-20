// StepWrapper.js
import {
  currentQuestionAtom,
  nextQuestionAtom,
  previousQuestionAtom,
} from "../AnswersForm/answers.form.atoms";
import { useAtom } from "jotai";
import ChevronMagenta from "../../assets/chevron-magenta.svg";

interface StepWrapperProps {
  children: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useAtom(currentQuestionAtom);
  const [, nextQuestion] = useAtom(nextQuestionAtom);
  const [, previousQuestion] = useAtom(previousQuestionAtom);
  return (
    <div className="mx-auto">
      <section className="w-full mt-62 mb-62">
        <h1 className="font-poppins font-bold text-40 text-center">
          Volebná kalkulačka
        </h1>
      </section>

      <img
        src="/images/big-x.png"
        alt=""
        style={{
          width: "772px",
          height: "737px",
          right: "0",
          top: "124px",
          position: "absolute",
        }}
      />

      <div className="relative">
        <section className="text-center py-77 px-100 border border-light-grey rounded-cool shadow-custom-light backdrop-blur bg-white bg-opacity-90 w-930">
          {children}
        </section>
        {currentQuestion !== 0 && (
          <section className="absolute flex gap-930 w-960 top-200">
            <div className="w-1/2 text-left absolute -left-50">
              <button onClick={() => previousQuestion()}>
                <img src={ChevronMagenta} alt="Back" />
              </button>
            </div>
            <div className="w-1/2 text-right absolute -right-20">
              <button onClick={() => nextQuestion()}>
                <img className="rotate-180" src={ChevronMagenta} alt="Next" />
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default StepWrapper;
