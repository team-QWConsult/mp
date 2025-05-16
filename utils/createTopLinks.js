import { flatten, kebabCase, snakeCase } from "lodash";
import { attributes as locationData } from "../content/locations.md";

const addLocationToLinks = (links) =>
  flatten(
    links.map((link) =>
      locationData.allLocations.map((location) => ({
        title: link.title + " in " + location,
        link: `${link.link}-in-${kebabCase(location)}`,
      }))
    )
  );

export default function createTopLinks(offer, location) {
  const allLocations = locationData.allLocations;
  let defaultRentLinks = [
    { title: "Apartments for rent", link: "apartment-for-rent" },
    {
      title: "Furnished houses for rent",
      link: "properties-for-rent?furnished=true",
    },
    { title: "Houses for rent", link: "house-for-rent" },
    { title: "Townhouses for rent", link: "townhouse-for-rent" },
    { title: "Villas for rent", link: "villa-for-rent" },
    { title: "Studios for rent", link: "properties-for-rent?bedroom_count=1" },
    {
      title: "Commercial properties for rent",
      link: "commercial_property-for-rent",
    },
  ];

  let rentPriceFilters = [
    {
      title: "Below KSH 50,0000",
      link: "property-search?max_price=50000&offer=rent",
    },
    {
      title: "Below KSH 100,000",
      link: "property-search?max_price=100000&min_price=50000&offer=rent",
    },
    {
      title: "Below KSH 200,000",
      link: "property-search?max_price=200000&min_price=100000&offer=rent",
    },
    {
      title: "Above KSH 200,000",
      link: "property-search?min_price=200000&offer=rent",
    },
  ];

  let salePriceFilters = [
    {
      title: "Below 5M",
      link: "property-search?max_price=5000000&offer=sale",
    },
    {
      title: "Below 10M",
      link: "property-search?max_price=10000000&min_price=5000000&offer=sale",
    },
    {
      title: "Above 10M",
      link: "property-search?min_price=10000000&offer=sale",
    },
  ];

  let defaultSaleLinks = [
    { title: "Apartments for sale", link: "apartment-for-sale" },
    { title: "Houses for sale", link: "house-for-sale" },
    { title: "Plots for sale", link: "land_plot-for-sale" },
  ];

  let finalLinks;
  let finalPriceFilters;
  let locationList = [];

  if (offer === "rent") {
    finalLinks = [...defaultRentLinks, ...addLocationToLinks(defaultRentLinks)];
    finalPriceFilters = rentPriceFilters;
  }

  if (offer === "sale") {
    finalLinks = [...defaultSaleLinks, ...addLocationToLinks(defaultSaleLinks)];
    finalPriceFilters = salePriceFilters;
  }

  if (offer === "NONE") {
    finalLinks = [
      { title: "Properties for sale", link: "properties-for-sale" },
      { title: "Properties for rent", link: "properties-for-rent" },
      { title: "Apartments", link: "apartment" },
      { title: "Houses", link: "house" },
      { title: "Commercial Properties", link: "commercial_property" },
    ];
    finalPriceFilters = [];
  }

  if (location) {
    locationList = finalLinks.map((i) => ({
      title: `${i.title} in ${location}`,
      link: `${i.link}-in-${snakeCase(location)}`,
    }));
  }

  return {
    links: finalLinks,
    prices: finalPriceFilters,
    locationLinks: locationList,
  };
}
