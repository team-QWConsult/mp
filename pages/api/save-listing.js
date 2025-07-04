import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";
import { downloadAndParseJsonBlob, uploadJsonBlob } from "../../utils/jsonDB";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const submitHandler = async (req, res) => {
  const body = req.body;

  if (!body)
    return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

  const data = body;

  // Generate a random id to store the survey entry under
  const nanoid = customAlphabet("1234567890abcdefghijklmopqrstuvwxyz", 5);
  const id = nanoid(5);

  // Insert data into Upstash redis
  const listings = await downloadAndParseJsonBlob();
  const newListing = { id, ...data };
  listings.push(newListing);

  await uploadJsonBlob(listings);

  return res.status(200).json({
    success: true,
    message: "Data inserted successfully",
  });
};

export default submitHandler;
