const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for a news card
const newsCardSchema = new Schema({
  headline: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,

    required: true,
    trim: true,
  },
  photo: [
    {
      type: String,

      trim: true,
    },
  ],
  publishedAt: {
    type: Date,
    default: Date.now, // Adjusted to use Date.now reference
  },
  source: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      required: false,
      trim: true,
    },
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  author: {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    profileUrl: {
      type: String,
      required: false,
      trim: true,
    },
  },
  readMoreUrl: {
    type: String,
    trim: true,
  },

  video: {
    type: String,
    trim: true,
  },
});
newsCardSchema.index({ headline: "text", summary: "text", category: "text" });
newsCardSchema.index({ category: 1 }); // Index for faster category-based queries
// Create the model using the schema
const NewsCard = mongoose.model("NewsCard", newsCardSchema);
module.exports = NewsCard;
