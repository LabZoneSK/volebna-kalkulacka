import Button from "./common/Button";
import StepWrapper from "./AppSteps/StepWrapper";
import { nextStepAtom } from "./AppSteps/stepper.atoms";
import { useAtom } from "jotai";

const Start = () => {
  const [, setNextStep] = useAtom(nextStepAtom);
  return (
    <StepWrapper>
      <p className="font-poppins mb-6">
        Potom ti kalkulačka vypočíta, ku ktorej <b>strane máš najbližšie</b>.
      </p>
      <p className="font-poppins mb-62">
        <b>Odporúčame ti túto stranu ďalej sledovať</b> v diskusiách, prečítať
        si jej program a presvedčiť sa, že si s touto voľbou naozajn
        stotožnený/á.
      </p>

      <Button
        handleClick={() => {
          setNextStep();
        }}
        label="Spustiť kalkulačku"
      />
    </StepWrapper>
  );
};

export default Start;
