import { Drug } from "../ts/interfaces";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const API_URL = `https://api.fda.gov/drug/ndc.json?api_key=${apiKey}`;

export const fetchByNdc = async (ndc: string): Promise<Drug> => {
  const response = await fetch(`${API_URL}&search=product_ndc:${ndc}`);
  const data = await response.json();
  return data.results[0];
};

export const fetchAllResults = async (query: string, filter: string): Promise<Drug[]> => {
  let allResults: Drug[] = [];
  let skip = 0;
  const limit = 1000;
  let totalResults = 0;

  const initialResponse = await fetch(`${API_URL}&search=${filter}:${query}*&limit=1`);
  const initialData = await initialResponse.json();

  if(initialData.error){
    throw new Error(initialData.error.message);
  }
  totalResults = initialData.meta.results.total;

  while (skip < totalResults) {
    const response = await fetch(`${API_URL}&search=${filter}:${query}*&skip=${skip}&limit=${limit}`);
    const data = await response.json();
    allResults = allResults.concat(data.results);
    skip += limit;
  }

  return allResults;
};
