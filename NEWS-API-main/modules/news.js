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
    required: true,
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
    required: true,
    trim: true,
  },

  video: {
    type: String,
    trim: true,
  },
});
newsCardSchema.index({ headline: "text", summary: "text", category: "text" });

// Create the model using the schema
const NewsCard = mongoose.model("NewsCard", newsCardSchema);
module.exports = NewsCard;
