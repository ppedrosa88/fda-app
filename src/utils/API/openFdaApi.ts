import { Drug } from "../ts/interfaces";

const apiKey = import.meta.env.VITE_APP_API_KEY;

  const API_URL = `https://api.fda.gov/drug/ndc.json?api_key=${apiKey}`;
  
  export const searchDrugs = async (query: string): Promise<Drug[]> => {
    const response = await fetch(`${API_URL}&search=generic_name:${query}*&limit=10`);
    const data = await response.json();
    return data.results || [];
  };

  export const drugByNdc = async (ndc: string): Promise<Drug> => {
    const response = await fetch(`${API_URL}&search=product_ndc:${ndc}`);
    const data = await response.json();
    return data.results[0];
  }