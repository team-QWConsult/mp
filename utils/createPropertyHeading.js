import upperFirst from "lodash/upperFirst";

const createPropertyHeading = (i) =>
  `${i.bedroom_count ? i.bedroom_count + " bedroom " : ""}${upperFirst(
    i.property_type?.split("_")[0]
  )} for ${i.offer} in ${i.address || i.town_suburb}`;

export default createPropertyHeading;
