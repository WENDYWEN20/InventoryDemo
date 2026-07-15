const mongoose = require("mongoose");
const approvalHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: [
        "SUBMITTED",
        "PENDING_MANAGER_APPROVAL",
        "APPROVED",
        "REJECTED",
        "CANCELLED",
      ],
    },
    actorId: { type: String, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);
const userRequestSchema = new mongoose.Schema(
  {
    requesterId: {
      type: String,
      required: true,
      index: true,
    },
    approverId: {
      type: String,
      required: true,
      index: true,
    },
    requestType: {
      type: String,
      required: true,
      enum: ["ACCESS_CHANGE", "ROLE_CHANGE", "DATA_ACCESS", "OTHER"],
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
      default: "PENDING",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    approvalHistory: {
      type: [approvalHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Main dashboard query:
// approverId + status + createdAt sort
userRequestSchema.index({
  approverId: 1,
  status: 1,
  createdAt: -1,
});

// Requester dashboard query:
// requesterId + status + createdAt sort
userRequestSchema.index({
  requesterId: 1,
  status: 1,
  createdAt: -1,
});

// Admin filtering by request type/status/date
userRequestSchema.index({
  requestType: 1,
  status: 1,
  createdAt: -1,
});

module.exports = mongoose.model("UserRequest", userRequestSchema);