export default async function saveListing(data) {
  try {
    await fetch("/api/save-listing", {
      body: JSON.stringify({
        ...data,
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
