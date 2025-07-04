import { put, list } from "@vercel/blob";

export async function uploadJsonBlob(jsonData) {
  const filename = "listings.json";
  const blob = await put(filename, JSON.stringify(jsonData, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: true,
  });

  return blob.url; // returns a public URL to the uploaded file
}

export async function downloadAndParseJsonBlob(
  blobUrl = "https://qac0mbmjc3kcbf45.public.blob.vercel-storage.com/listings-547o43IaQD0OLPWkvJercREaRH0yE9.json"
) {
  const { blobs } = await list();

  // Filter JSON files only
  const jsonBlobs = blobs.filter((blob) => blob.pathname.endsWith(".json"));

  if (jsonBlobs.length === 0) {
    throw new Error("No JSON blobs found");
  }

  // Sort by upload time descending
  jsonBlobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

  const latestBlobUrl = jsonBlobs[0].url;

  const res = await fetch(latestBlobUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch latest JSON blob: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
