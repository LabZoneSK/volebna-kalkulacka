import Button from "./common/Button";
import StepWrapper from "./AppSteps/StepWrapper";
import { nextStepAtom } from "./AppSteps/stepper.atoms";
import { useAtom } from "jotai";

const Intro = () => {
  const [, setNextStep] = useAtom(nextStepAtom);
  return (
    <StepWrapper>
      <p className="font-poppins mb-6">
        Opýtame sa ťa <b>15 otázok</b>, ktoré trápia mladých.
      </p>
      <p className="font-poppins mb-62">
        Odpovedať môžeš <b>Áno, Nie</b>, otázku označiť za <b>Dôležitú</b> alebo
        ju <b>Preskočiť</b>.<br />
        Vtedy tému vyhodnotíme ako pre teba nepodstatnú a vôbec ju nezarátame do
        výsledku
      </p>

      <Button
        handleClick={() => {
          setNextStep();
        }}
        label="Poďme ďalej"
      />
    </StepWrapper>
  );
};

export default Intro;
