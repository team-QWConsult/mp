import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const deleteHandler = async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

  try {
    // Delete the survey data
    await redis.del(id);

    // Remove the id from the entries set
    await redis.srem("entries", id);
  } catch (error) {
    console.error("Failed to delete data from redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete data from redis",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Data deleted successfully",
  });
};

export default deleteHandler;
