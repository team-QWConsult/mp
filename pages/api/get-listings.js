import { Redis } from "@upstash/redis";
import { downloadAndParseJsonBlob } from "../../utils/jsonDB";

const resultsHandler = async (req, res) => {
  try {
    //Find all the entries in the set
    const combinedResults = await downloadAndParseJsonBlob();
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
