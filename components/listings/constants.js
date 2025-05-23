import { find, includes, snakeCase } from "lodash";
import * as yup from "yup";

export const validationSchema = yup.object({
  region: yup.string("Enter property region").required("Region is required"),
  town_suburb: yup
    .string("Enter property location")
    .required("Enter Property Location"),
  description: yup.string().required("Required"),
  property_type: yup.string().required("Required"),
  marketing_title: yup.string().required("Required"),
  images: yup.array().min(3, "Add atleast three images").required("Required"),
});

export const initialValues = {
  property_type: "",
  bedroom_count: "",
  bathroom_count: "",
  size: "",
  size_unit: "acres",
  floor_size: "",
  floor_size_unit: "sqf",
  address: "",
  town_suburb: "",
  region: "",
  marketing_title: "",
  garages: "",
  sale_price: "",
  rent_price: "",
  rent_term: "monthly",
  price_unit: "KSH",
  description: "",
  video_link: "",
  furnishing: "",
  pets_allowed: "",
  features: ["Parking"],
  images: [],
  offer: "rent",
};

// Property Types
export const propertyCategories = [
  "Apartment",
  "House",
  "Townhouse",
  "Duplex",
  "Penthouse",
  "Bungalow",
  "Villa",
  "Land/Plot",
  "Farm",
  "Commercial Property",
  "Industrial Property",
  "Joint Venture (JV)",
  "Off-Plan Projects",
  "Foreclosure/Distress Property",
  "Auction Properties",
  "Rental Income Property",
  "Serviced/Managed Property",
  "Maisonette",
  "Mansion",
  "Single-Family House",
  "Bedsitter",
  "Studio",
  "Serviced Apartment",
  "Office Space",
  "Retail Space/Shop",
  "Hotel/Guesthouse",
  "Restaurant Space",
  "Warehouse/Go-down",
  "Showroom",
  "Mixed-Use Development",
  "Residential Plot",
  "Commercial Plot",
  "Agricultural/Farm Land",
];

export const propertyCategoriesWithSubCategories = [
  {
    type: "House",
    subCategories: [
      "Bungalow",
      "Maisonette",
      "Townhouse",
      "Villa",
      "Mansion",
      "Single-Family House",
    ],
  },
  {
    type: "Apartment",
    subCategories: [
      "Apartment",
      "Bedsitter",
      "Studio",
      "Duplex",
      "Serviced Apartment",
    ],
  },
  {
    type: "Commercial Property",
    subCategories: [
      "Office Space",
      "Retail Space/Shop",
      "Hotel/Guesthouse",
      "Restaurant Space",
      "Warehouse/Go-down",
      "Showroom",
      "Mixed-Use Development",
    ],
  },
  {
    type: "Land/Plot",
    subCategories: [
      "Residential Plot",
      "Commercial Plot",
      "Agricultural/Farm Land",
    ],
  },
  {
    type: "Special Categories",
    subCategories: [
      "Joint Venture (JV)",
      "Off-Plan Projects",
      "Foreclosure/Distress Property",
      "Auction Properties",
      "Rental Income Property",
      "Serviced/Managed Property",
    ],
  },
];

export function getPropertyCategories() {
  return propertyCategoriesWithSubCategories.map((i) => i.type);
}

export function getSubCategories(category) {
  return (
    find(
      propertyCategoriesWithSubCategories,
      (c) => snakeCase(c.type) === snakeCase(category)
    )?.subCategories || []
  );
}

// Price Units
export const priceUnitsOptions = ["KSH", "USD", "EUR"];

// Payment Terms
export const paymentTermsOptions = [
  "monthly",
  "daily",
  "quaterly",
  "yearly",
  "per sqm",
  "per sqm",
  "per acre",
];

// size Units
export const sizeUnitOptions = ["acres", "ha"];

// offer options
export const offerOptions = ["sale", "rent", "lease", "shortlet"];

// floor size units
export const floorSizeUnitOptions = ["sqf", "sqm"];

// Furnishing Status
export const furnishingOptions = ["Furnished", "Unfurnished", "Semi-furnished"];

export const petsOptions = ["Yes", "No"];

// Features
const internalFeatures = [
  "En Suite Bathrooms",
  "Fully Furnished",
  "Air Conditioning(AC)",
  "Fully Equiped Kitchen",
  "Pantry",
  "Hot water",
  "Walk In Closet",
  "Large Wardrobes",
  "Wooden Flooring",
  "Sunken Livingroom",
  "Island Kitchen",
  "Inbuilt Appliances",
];

const externalFeatures = [
  "Terrace",
  "Servants Quarters",
  "Private pool",
  "Private Gym",
  "Balcony",
  "Patio",
  "Gym",
  "Swimming Pool",
  "Children play area",
  "DSQ",
  "Garden",
  "Garage",
  "Car Port",
  "BBQ",
  "Gazebo",
];

const perksFetures = [
  "Solar",
  "Elevator",
  "Wifi",
  "Backup Generator",
  "Alarm",
  "CCTV cameras",
  "Electric Fence",
  "Serviced",
  "Parking",
  "24hrs Security",
];

const otherFeatures = [
  "Prepaid Electricity",
  "Guest House",
  "Cloak Room",
  "Paved Driveway",
  "Perimeter Fence/Wall",
];

const nearbyFeatures = [
  "Bus Stop",
  "Hospital",
  "School",
  "Beach Access",
  "Waterfront",
  "Sea View",
  "Shopping Mall",
];

// property Features
export const popularFeatures = [
  ...internalFeatures,
  ...externalFeatures,
  ...perksFetures,
  ...otherFeatures,
  ...nearbyFeatures,
];

export const getStructuredFeatures = (features) => {
  let internal = features.filter((i) => includes(internalFeatures, i));
  let external = features.filter((i) => includes(externalFeatures, i));
  let nearby = features.filter((i) => includes(nearbyFeatures, i));
  let perks = features.filter((i) => includes(perksFetures, i));
  let others = features.filter((i) => includes(otherFeatures, i));

  return {
    internal,
    external,
    nearby,
    perks,
    others,
  };
};

export const regions = [
  "NAIROBI",
  "MOMBASA",
  "KIAMBU",
  "KISUMU",
  "KILIFI",
  "NAKURU",
  "MACHAKOS",
  "KWALE",
  "KAJIADO",
  "BARINGO",
  "BOMET",
  "BUNGOMA",
  "BUSIA",
  "ELGEYO-MARAKWET",
  "EMBU",
  "GARISSA",
  "HOMA-BAY",
  "ISIOLO",
  "KAKAMEGA",
  "KERICHO",
  "KIRINYAGA",
  "KISII",
  "KITUI",
  "LAIKIPIA",
  "LAMU",
  "MAKUENI",
  "MANDERA",
  "MARSABIT",
  "MERU",
  "MIGORI",
  "MURANGA",
  "NANDI",
  "NAROK",
  "NYAMIRA",
  "NYANDARUA",
  "NYERI",
  "SAMBURU",
  "SIAYA",
  "TAITA-TAVETA",
  "TANA RIVER",
  "THARAKA-NITHI",
  "TRANS-NZOIA",
  "TURKANA",
  "UASIN GISHU",
  "VIHIGA",
  "WAJIR",
  "WEST POKOT",
];
