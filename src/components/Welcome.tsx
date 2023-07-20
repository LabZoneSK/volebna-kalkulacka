import Button from "./common/Button";
import { nextStepAtom } from "./AppSteps/stepper.atoms";
import { questionsFormActiveAtom } from "./AnswersForm/answers.form.atoms";
import { useAtom, useSetAtom } from "jotai";

const Welcome = () => {
  const [, setNextStep] = useAtom(nextStepAtom);
  const questionsFormActive = useSetAtom(questionsFormActiveAtom);

  questionsFormActive(false);

  return (
    <div className="w-930 mx-auto">
      <section className="w-full flex items-center">
        <h1 className="font-poppins text-50 font-bold w-1/2">
          Zisti, koho voliť podľa{" "}
          <span className="text-magenta">tvojich hodnôt</span>!
        </h1>
        <img src="/images/welcome-x.png" alt="" />
      </section>

      <section className="text-center py-77 px-100 border border-light-grey rounded-cool shadow-custom-light backdrop-blur">
        <h2 className="text-center font-bold text-magenta text-34 uppercase mb-10">
          Nevyberaj ľudí, voľ hodnoty!
        </h2>
        <p className="font-poppins mb-50">
          Niekedy je veľmi ťažké vybrať si tú správnu politickú stranu. Chápeme.
          <br />
          Veríme však, že hodnoty máš celkom jasné. Práve preto sme v{" "}
          <b>Zmudri G</b>
          <br />
          pripravili <b>volebnú kalkulačku</b> pre každého mladého človeka.
        </p>
        <Button
          handleClick={() => setNextStep()}
          label="Spustiť volebnú kalkulačku"
        />
      </section>
    </div>
  );
};

export default Welcome;
