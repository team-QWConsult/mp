import { API_ENDPOINT } from "../../utils/constants";

const updateHandler = async (req, res) => {
  const { id } = req.query;
  const { data } = req.body;

  if (!id || !data)
    return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

  const apiRes = await fetch(`${API_ENDPOINT}/properties/${id}`, {
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
  });

  const d = await apiRes.json();
  console.log(d.message);

  return res.status(200).json({
    success: true,
    message: "Data updated successfully",
  });
};

export default updateHandler;
