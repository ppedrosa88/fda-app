export interface ActiveIngredient {
  name: string;
  strength: string;
}

export interface Packaging {
  package_ndc: string;
  description: string;
  marketing_start_date: string;
  sample: boolean;
}

export interface OpenFDA {
  manufacturer_name: string[];
  rxcui?: string[];
  spl_set_id?: string[];
  is_original_packager?: boolean[];
  upc?: string[];
  nui?: string[];
  pharm_class_epc?: string[];
  pharm_class_pe?: string[];
  unii?: string[];
}

export interface Drug {
  product_ndc: string;
  generic_name: string;
  labeler_name: string;
  brand_name: string;
  active_ingredients: ActiveIngredient[];
  finished: boolean;
  packaging: Packaging[];
  listing_expiration_date: string;
  openfda: OpenFDA;
  marketing_category: string;
  dosage_form: string;
  spl_id: string;
  product_type: string;
  route: string[];
  marketing_start_date: string;
  product_id: string;
  application_number: string;
  brand_name_base: string;
  pharm_class?: string[];
  dea_schedule?: string;
  }

  export enum SearchFilter {
    GENERIC_NAME = "generic_name",
    BRAND_NAME = "brand_name",
  }
