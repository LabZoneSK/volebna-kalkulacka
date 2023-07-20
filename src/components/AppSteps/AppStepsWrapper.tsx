import Welcome from "../Welcome";

interface StepProps {
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ children }) => {
  return <div>{children}</div>;
};

const AppStepsWrapper = () => {
  const steps = [
    <Step>
      <Welcome />
    </Step>,
  ];
  return <div className="mx-auto w-930">{steps.map((step) => step)}</div>;
};

export default AppStepsWrapper;
