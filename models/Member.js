import mongoose from "mongoose";
// import { Snowflake } from "@theinternetfolks/snowflake";

const memberSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    //   default: Snowflake.generate({ timestamp: Date.now() }),
    //   unique: true,
    // },
    community: {
      type: mongoose.ObjectId,
      ref: "Community",
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: mongoose.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Member", memberSchema);
