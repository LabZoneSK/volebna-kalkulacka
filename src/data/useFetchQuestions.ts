import { useState, useEffect } from "react";
import { fetchAirtable } from "./fetchAirtable";
import { transformResponseToQuestions } from "../helpers/transformers";
const useFetchQuestions = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      // Use only the path to the API endpoint
      const result = await fetchAirtable(
        "tblUOSXIw4BIG35Z8?view=viwHm2oa6LUxDLG0i"
      );
      // Transform the response to the desired format
      const transformedResult = transformResponseToQuestions(result);

      setData(transformedResult);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  return { loading, data };
};

export default useFetchQuestions;
