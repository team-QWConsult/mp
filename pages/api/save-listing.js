import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";

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

  try {
    //Store the survey data
    await redis.hset(`${id}`, data);

    //Store the id of the survey to retrieve it later
    await redis.sadd("entries", `${id}`);
  } catch (error) {
    console.error("Failed to insert data into redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to insert data into redis",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Data inserted successfully",
  });
};

export default submitHandler;
