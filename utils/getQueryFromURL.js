const getQueryFromUrl = (url) => {
  let f = url
    .split("-")
    .filter((i) => i !== "for")
    .filter((i) => i !== "in");

  let propertyTypeQuery = f[0];
  let offerQuery = f.length > 1 ? f[1] : "NONE";
  let locationQuery = f.length > 2 ? f[2] : "NONE";

  return { propertyTypeQuery, offerQuery, locationQuery };
};

export default getQueryFromUrl