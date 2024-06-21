import { Drug } from "../ts/interfaces";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const API_URL = `https://api.fda.gov/drug/ndc.json?api_key=${apiKey}`;

/**
 * Fetches drug information by National Drug Code (NDC).
 * @param ndc The National Drug Code to search for.
 * @returns A Promise resolving to a Drug object.
 */
export const fetchByNdc = async (ndc: string): Promise<Drug> => {
  const response = await fetch(`${API_URL}&search=product_ndc:${ndc}`);
  const data = await response.json();
  return data.results[0];
};

/**
 * Fetches all drug results based on a query and filter.
 * @param query The search query.
 * @param filter The filter type (e.g., "generic_name", "brand_name").
 * @returns A Promise resolving to an array of Drug objects.
 */

export const fetchAllResults = async (query: string, filter: string): Promise<Drug[]> => {
  let allResults: Drug[] = [];
  let skip = 0;
  const limit = 1000;
  let totalResults = 0;

    // Fetch initial response to get total results count
  const initialResponse = await fetch(`${API_URL}&search=${filter}:${query}*&limit=1`);
  const initialData = await initialResponse.json();

    // Check for errors in initial response
  if(initialData.error){
    throw new Error(initialData.error.message);
  }

    // Get total results count from metadata
  totalResults = initialData.meta.results.total;

    // Loop through paginated results until all are fetched
  while (skip < totalResults) {
    const response = await fetch(`${API_URL}&search=${filter}:${query}*&skip=${skip}&limit=${limit}`);
    const data = await response.json();
    allResults = allResults.concat(data.results);
    skip += limit;
  }

    // Return all fetched results
  return allResults;
};
