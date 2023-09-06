import mongoose from "mongoose";
// import { Snowflake } from "@theinternetfolks/snowflake";

const userSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    //   default: Snowflake.generate({ timestamp: Date.now() }).toString(),
    //   unique: true,
    // },
    name: {
      type: String,
      default: null,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// userSchema.set("primarykey", "id");
export default mongoose.model("User", userSchema);
