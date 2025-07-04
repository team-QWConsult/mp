import { Redis } from "@upstash/redis";
import {
  downloadAndParseJsonBlob,
  uploadJsonBlob,
} from "../../../utils/jsonDB";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id)
    return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

  const listings = await downloadAndParseJsonBlob();

  //   GET
  if (req.method === "GET") {
    let data = listings.find((listing) => listing.id === id);

    return res.status(200).json({
      success: true,
      data: { ...data },
    });
  }

  //   POST
  if (req.method === "POST") {
    const { data } = req.body;

    if (!data)
      return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

    let listingData = listings.find((listing) => listing.id === id);
    if (!listingData)
      return res.status(404).json({ error: "NOT_FOUND", status: "ERROR" });

    // Update the listing data
    listingData = { ...listingData, ...data };

    const newListings = listings.map((listing) =>
      listing.id === id ? listingData : listing
    );

    await uploadJsonBlob(newListings);

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
    });
  }

  //   DELETE
  if (req.method === "DELETE") {
    const newListings = listings.filter((listing) => listing.id !== id);
    if (newListings.length === listings.length) {
      return res.status(404).json({ error: "NOT_FOUND", status: "ERROR" });
    }
    await uploadJsonBlob(newListings);

    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  }
}
