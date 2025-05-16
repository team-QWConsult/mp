async function main() {
  try {
    const listings = await fetch(
      "https://geoff-teams.vercel.app/api/v2/listings?team=5YmuqACHvGoQY4fF9UUO"
    );
    const data = await listings.json();

    console.log(data.listings.length);
    // delete all listings
    async function deleteListings(listings) {
      if (listings.length === 0) {
        return;
      }

      const listing = listings[0];
      try {
        const res = await fetch(
          `https://geoff-teams.vercel.app/api/delete?docID=${listing.id}&team=5YmuqACHvGoQY4fF9UUO`
        );
        const data = await res.json();

        console.log("Deleted", data);
      } catch (err) {
        console.log(err);
      }

      await deleteListings(listings.slice(1));
    }

    deleteListings(data.listings);
  } catch (err) {
    console.log(err);
  }
}

main();
