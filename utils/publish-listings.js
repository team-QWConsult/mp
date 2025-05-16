const fs = require("fs");

const { isArray } = require("lodash");
const importedListings = require("../data.json");

function getBedroomCount(listing) {
  if (
    listing.type !== "house" &&
    listing.type !== "apartment" &&
    listing.type !== "townhouse"
  ) {
    return null;
  }

  if (listing.title.includes("1")) return 1;
  if (listing.title.includes("2")) return 2;
  if (listing.title.includes("3")) return 3;
  if (listing.title.includes("4")) return 4;

  return null;
}

const formatedListings = importedListings.map((i) => ({
  owner: "5YmuqACHvGoQY4fF9UUO",
  listing_agent: "cHwPBmXEh3RknzcIXb1HImyItHv2",
  team: "5YmuqACHvGoQY4fF9UUO",
  floor_sizeunit: "sqm",
  address: i.location,
  town_suburb: i.location,
  description: i.content,
  marketing_title: i.title,
  bedroom_count: getBedroomCount(i),
  offer: i.offer,
  price_unit: "KSH",
  city_region: "Nairobi",
  rent_term: "monthly",
  price: i.price,
  rent_price: i.price,
  size_unit: "acres",
  features: [
    "Parking",
    "24hrs Security",
    "Built in Wardrobes",
    "Children play area",
    "Fully Equiped Kitchen",
    "Near supermarket",
    "Near Malls",
    "Near Schools",
  ],
  images:
    i.featuredimage && i.gallery && isArray(i.gallery)
      ? [i.featuredimage, ...i.gallery]
      : [i.featuredimage],
  published: true,
  property_type: i.type,
  featured: i.featured,
}));

// fs.writeFileSync("listing-data.json", JSON.stringify(formatedListings));

//for each item in formated listings send a post request to the api https://geoff-teams.vercel.app/api/listings

async function postListings(listings) {
  if (listings.length === 0) {
    return;
  }

  const listing = listings[0];
  try {
    const res = await fetch("https://geoff-teams.vercel.app/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  // Call the function recursively with the remaining listings
  await postListings(listings.slice(1));
}

postListings(formatedListings);
