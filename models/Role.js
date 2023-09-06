import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const RoleSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    //   default: Snowflake.generate({ timestamp: Date.now() }),
    //   unique: true,
    // },
    name: {
      type: String,
      default: null,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// RoleSchema.set("primarykey", "_id");
export default mongoose.model("Role", RoleSchema);
