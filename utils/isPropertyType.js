import snakeCase from "lodash/snakeCase";
import includes from "lodash/includes";

export const isPropertyType = (query) =>
  includes(
    propertyTypes.map((i) => snakeCase(i)),
    query
  );

const propertyTypes = [
  "Apartment",
  "House",
  "Villa",
  "Townhouse",
  "Duplex",
  "Bungalow",
  "Mansion",
  "Land_Plot",
  "Farm",
  "Commercial Property",
  "Industrial Property",
  "Properties",
];
