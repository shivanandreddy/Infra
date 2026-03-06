import mongoose from "mongoose";
import { incident_status, incident_priority, workgroups } from "../enum.js";

const HandoverSchema = new mongoose.Schema(
  {
    workgroup: {
      type: String,
      enum: workgroups,
      required: true,
    },

    shiftDate: {
      type: Date,
      required: true,
    },

    currentShiftPerson: {
      name: { type: String, required: true },
  userid: { type: String, required: true },

      
    },

    nextShiftPerson: {
  type: [
    {
      name: { type: String, required: true },
      userid: { type: String, required: true },
    },
  ],
  default: [],
},
    acknowledgementStatus: {
      type: String,
      enum: ["Pending", "Acknowledged"],
      default: "Pending",
    },

 

    reports: {
      type: [
        {
          title: { type: String, required: true },
          description: String,
        },
      ],
      default: [],
    },

    incidents: {
      type: [
        {
          incidentId: String,
          title: { type: String, required: true },
          status: {
            type: String,
            enum: incident_status,
            default: "OPEN",
          },
          priority: {
            type: String,
            enum: incident_priority,
            default: "P4",
          },
          assignedTo: String,
          remarks: String,
        },
      ],
      default: [],
    },

    alerts: {
      type: [
        {
          alertName: { type: String, required: true },
          severity: String,
          description: String,
          remarks: String,
        },
      ],
      default: [],
    },

    systemStatus: {
      type: [
        {
          systemName: String,
          status: String,
          remarks: String,
        },
      ],
      default: [],
    },

    pendingTasks: {
      type: [
        {
          taskName: { type: String, required: true },
          assignedTo: String,
          dueDate: Date,
          status: String,
          remarks: String,
        },
      ],
      default: [],
    },

    changeRequests: {
      type: [
        {
          changeId: { type: String, required: true },
          description: String,
          status: String,
          remarks: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Handover", HandoverSchema);
