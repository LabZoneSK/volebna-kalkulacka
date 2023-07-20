import { atom } from "jotai";

export const currentStepAtom = atom(0);

// Atom for the nextStep function
export const nextStepAtom = atom(
  (get) => get(currentStepAtom), // get function to access the current state of the currentStep atom
  (get, set) => set(currentStepAtom, get(currentStepAtom) + 1) // set function to increment the currentStep atom
);

// Atom for the prevStep function
export const prevStepAtom = atom(
  (get) => get(currentStepAtom), // get function to access the current state of the currentStep atom
  (get, set) => set(currentStepAtom, Math.max(get(currentStepAtom) - 1, 0)) // set function to decrement the currentStep atom
);
