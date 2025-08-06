import { customAlphabet } from "nanoid";
import { API_ENDPOINT } from "../../utils/constants";

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
    const apiRes = await fetch(`${API_ENDPOINT}/properties`, {
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const d = await apiRes.json();
    console.log(d.message);
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({
    success: true,
    message: "Data inserted successfully",
  });
};

export default submitHandler;
