import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const communitySchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    //   default: Snowflake.generate({ timestamp: Date.now() }),
    // },
    name: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Community", communitySchema);
