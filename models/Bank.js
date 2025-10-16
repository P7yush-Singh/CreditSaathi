import mongoose from "mongoose";

const BankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true }, // image URL (Cloudinary or static)
  },
  { timestamps: true }
);

export default mongoose.models.Bank || mongoose.model("Bank", BankSchema);
