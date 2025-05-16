import upperFirst from "lodash/upperFirst";

const createCategoryHeading = (pageDetails) => {
  const { propertyTypeQuery, offerQuery, locationQuery } = pageDetails;

  let c = `${upperFirst(propertyTypeQuery)}${
    propertyTypeQuery !== "properties" ? "s" : ""
  }`.split("_")[0];

  let d = offerQuery !== "NONE" ? "for " + offerQuery : "";
  let e = locationQuery !== "NONE" ? "in " + locationQuery : "";
  let title = `${c} ${d} ${e}`;

  let description = `${title} in Kenya. Discover coastal residential properties in Kenya for sale and rent at your budget and style. We are among the top companies helping clients find ${title} and more properties in Kenya.`;

  return { description, title };
};

export default createCategoryHeading;
