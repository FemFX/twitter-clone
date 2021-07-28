import { model, Schema } from "mongoose";

const TweetSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 280,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const TweetModel = model("Tweet", TweetSchema);
