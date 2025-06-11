const fs = require("fs");
const { join } = require("path");

const NEXT_PUBLIC_TEAM_ID = "HCjGvDga5nPpRufVWSZf";
const SITE_URL = "https://mapemaproperties.com";

async function getListings() {
  let listings = [];
  try {
    const res = await fetch(`${SITE_URL}/api/get-listings`);
    const dataData = await res.json();
    if (dataData.success) {
      listings = dataData.data;
    }
  } catch (err) {
    console.log(err);
  }

  return listings;
}

async function listingsAPI() {
  try {
    let listings = await getListings();

    console.log("Found " + listings.length + " listings");

    //save to data.json
    fs.writeFileSync(
      join(process.cwd(), "listings.json"),
      JSON.stringify(listings)
    );
  } catch (error) {
    console.log(error);
  }
}

listingsAPI();
