export default async function updateListing(data, id) {
  console.log(id);
  if (!id) return;

  try {
    await fetch(`/api/listings/${id}`, {
      body: JSON.stringify({
        data,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "ERROR";
  }
}
