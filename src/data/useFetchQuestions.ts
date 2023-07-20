import { useState, useEffect } from "react";
import { fetchAirtable } from "./fetchAirtable";
import { transformResponseToQuestions } from "../helpers/transformers";

import { useAtom, useSetAtom } from "jotai";
import {
  questionsAtom,
  answersAtom,
} from "../components/AnswersForm/answers.form.atoms";

const useFetchQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useAtom(questionsAtom);
  const setAnswers = useSetAtom(answersAtom);

  useEffect(() => {
    const fetchQuestions = async () => {
      // Use only the path to the API endpoint
      const result = await fetchAirtable(
        "tblUOSXIw4BIG35Z8?view=viwHm2oa6LUxDLG0i"
      );
      // Transform the response to the desired format
      const transformedResult = transformResponseToQuestions(result);

      setQuestions(transformedResult);
      setAnswers(new Array(transformedResult.length).fill(0));
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  return { loading, questions };
};

export default useFetchQuestions;
