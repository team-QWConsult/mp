const cloudinary = require("cloudinary").v2;

export default async function cdnsig(req, res) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({ signature: signature, timestamp: timestamp });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
