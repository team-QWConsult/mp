export default async function deleteListing(id) {
  if (!id) return;

  try {
    await fetch(`/api/listings/${id}`, {
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
