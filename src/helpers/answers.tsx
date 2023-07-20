import { ReactComponent as Thumb } from "../assets/thumb.svg";

export const getResponseText = (answer: number) => {
  switch (answer) {
    case 1:
      return "Áno";
    case 0:
      return <Thumb />;
    case -1:
      return "Nie";
  }
};
