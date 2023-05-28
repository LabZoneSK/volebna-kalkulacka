import { useState, useEffect } from "react";
import { fetchAirtable } from "./fetchAirtable";
import { transformResponseToPoliticalParties } from "../helpers/transformers";
const useFetchAnswers = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      // Use only the path to the API endpoint
      const result = await fetchAirtable(
        "tblZ2ct746fdfB39Z?view=viwiYe2EgZLwhKsbX"
      );
      // Transform the response to the desired format
      const transformedResult = transformResponseToPoliticalParties(result);

      setData(transformedResult);
      setLoading(false);
    };

    fetchAnswers();
  }, []);

  return { loading, data };
};

export default useFetchAnswers;
