import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { fetchByNdc } from "../utils/API/openFdaApi";
import { Drug } from "../utils/ts/interfaces";
import { Loading, RenderDrugDetails } from "../components";

export const DrugDetails = (): JSX.Element => {
  // Extracting id parameter from URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [drug, setDrug] = useState<Drug>({} as Drug);
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch drug details based on id when id changes
  useEffect(() => {
    const fetchDrug = async () => {
      if (id) {
        const drugData = await fetchByNdc(id);
        setDrug(drugData);
        setLoading(false);
      }
    };

    fetchDrug();
  }, [id]);

  // Function to handle navigation back
  const handleGoBack = () => {
    navigate(-1);
  };

  return loading ? (
    <Loading />
  ) : (
    <RenderDrugDetails drug={drug} handleGoBack={handleGoBack} />
  );
};
