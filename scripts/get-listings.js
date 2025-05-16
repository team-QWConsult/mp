const fs = require("fs");
const { join } = require("path");

const NEXT_PUBLIC_TEAM_ID = "HCjGvDga5nPpRufVWSZf";

async function listingsAPI() {
  try {
    const dataFromGCP = await fetch(
      `https://storage.googleapis.com/pro-sync-ke.appspot.com/${NEXT_PUBLIC_TEAM_ID}-properties.json`
    );
    const data = await dataFromGCP.json();

    let listings = [...data.listings];

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
