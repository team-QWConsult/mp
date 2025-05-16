export default function watermarkImg(
  publicID,
  watermarkID = "logos:logo_vaezju"
) {
  if (!publicID) return;

  if (publicID.includes("http")) return publicID;

  let cloudName = publicID.split("@")[1] || "geoffokumustudio";

  if (cloudName === "geoffokumustudio" || cloudName === "chat-cart")
    return `/${publicID.split("@")[0]}.jpg`;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${
    publicID.split("@")[0]
  }`;
}
