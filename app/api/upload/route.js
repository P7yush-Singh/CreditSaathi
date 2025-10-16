import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "CreditSaathi" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });
  } catch (error) {
    console.error("Upload failed:", error);
    return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
  }
}
