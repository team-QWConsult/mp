import { Redis } from "@upstash/redis";

const resultsHandler = async (req, res) => {
  // Retrieve data from redis

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    //Find all the entries in the set
    const entries = await redis.smembers("entries");

    //Get all survey entries by id/key

    //To run multiple queries at once, Upstash supports the use of the pipeline command. This way we can run multiple queries at once and get the results in a single call.
    const p = redis.pipeline();
    entries.forEach((id) => {
      p.hgetall(id);
    });
    const results = await p.exec();

    // Combine each result with its corresponding id
    let combinedResults = results.map((data, index) => ({
      id: entries[index],
      ...data,
    }));

    if (req.query && req.query.limit) {
      combinedResults = combinedResults.slice(0, parseInt(req.query.limit));
    }

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: combinedResults,
    });
  } catch (error) {
    console.error("Failed to retrieve data from redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve data from redis",
      data: [],
    });
  }
};

export default resultsHandler;
