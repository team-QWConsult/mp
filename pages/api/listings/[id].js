import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id)
    return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

  //   GET
  if (req.method === "GET") {
    let data;
    try {
      // Fetch the survey data
      data = await redis.hgetall(id);

      if (!data || Object.keys(data).length === 0) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      console.error("Failed to fetch data from redis", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch data from redis",
      });
    }

    return res.status(200).json({
      success: true,
      data: { id, ...data },
    });
  }

  //   POST
  if (req.method === "POST") {
    const { data } = req.body;

    if (!data)
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
  }

  //   DELETE
  if (req.method === "DELETE") {
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
  }
}
