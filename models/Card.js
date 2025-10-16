import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,
    category: String,
    bank: String,
    features: [String],
    eligibility: [String],
    whoShouldBuy: [String],
    applyLink: String,
    overview: [String],
    feesCharges: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Card || mongoose.model("Card", CardSchema);
