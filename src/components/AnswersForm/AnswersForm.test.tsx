import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnswersForm } from ".";
import { politicalPartiesStub, questionsStub } from "../stubs";

describe("Form", () => {
  test("render", () => {
    render(
      <AnswersForm
        politicalParties={politicalPartiesStub}
        questions={questionsStub}
      />
    );
    expect(screen.getByRole("heading")).toBeDefined();
  });
});
