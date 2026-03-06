import mongoose from "mongoose";
import { ticket_priority, ticket_status, workgroups } from "../enum.js";

const { Schema } = mongoose;

/* ===============================
   Counter Schema (Internal Use)
================================= */
const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

// Prevent model overwrite error in dev (nodemon)
const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);


/* ===============================
   Ticket Schema
================================= */
const ticketSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ticket_priority,
      default: "Low",
    },
    status: {
      type: String,
      enum: ticket_status,
      default: "Open",
    },
    workgroup: {
      type: String,
      enum: workgroups,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

/* ===============================
   Auto Generate CMS Key
================================= */
ticketSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "ticket" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true  }
    );



    // Format: CMS001, CMS002, CMS123
    this.key = `CMS${String(counter.seq).padStart(3, "0")}`;

    // next();
  } catch (error) {
    next(error);
  }
});

/* ===============================
   Export Model
================================= */
export default mongoose.models.Ticket ||
  mongoose.model("Ticket", ticketSchema);