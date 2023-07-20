import { atom } from "jotai";

export const currentQuestionAtom = atom(0);

export const nextQuestionAtom = atom(
  (get) => get(currentQuestionAtom),
  (get, set) => {
    const currentQuestion = get(currentQuestionAtom);
    set(currentQuestionAtom, currentQuestion + 1);
  }
);

export const previousQuestionAtom = atom(
  (get) => get(currentQuestionAtom),
  (get, set) => {
    const currentQuestion = get(currentQuestionAtom);
    if (currentQuestion > 0) {
      set(currentQuestionAtom, currentQuestion - 1);
    }
  }
);
