import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const updateHandler = async (req, res) => {
  const { id } = req.query;
  const { data } = req.body;

  if (!id || !data)
    return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

  try {
    // Update the survey data
    await redis.hset(id, data);
  } catch (error) {
    console.error("Failed to update data in redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update data in redis",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Data updated successfully",
  });
};

export default updateHandler;
