import { API_ENDPOINT } from "./constants";

export default async function deleteListing(id) {
  if (!id) return;

  try {
    await fetch(`${API_ENDPOINT}/properties/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "ERROR";
  }
}
