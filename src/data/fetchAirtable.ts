import axios from "axios";

const airtableAxios = axios.create({
  baseURL: "https://api.airtable.com/v0/appKhVso0XbQ4rKpK",
  headers: {
    Authorization: `Bearer patXljwL15Rgw0rdW.1bbbe165f9b983a7bc798b2d72d5c0034e9c202aa976ff1964117493e85d218a`,
  },
});

export const fetchAirtable = async (path: string) => {
  try {
    const response = await airtableAxios.get(path);
    return response.data.records;
  } catch (error) {
    console.error(`Failed to fetch data from Airtable: ${error}`);
    throw error;
  }
};
