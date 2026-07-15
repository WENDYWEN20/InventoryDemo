// services/userRequestService.js
const UserRequest = require("../models/UserRequest");

async function createUserRequest({
  requesterId,
  approverId,
  requestType,
  title,
  description,
  priority,
}) {
  const request = await UserRequest.create({
    requesterId,
    approverId,
    requestType,
    title,
    description,
    priority,
    status: "PENDING",
    approvalHistory: [
      {
        status: "SUBMITTED",
        actorId: requesterId,
        comment: "Request submitted",
      },
      {
        status: "PENDING_MANAGER_APPROVAL",
        actorId: "system",
        comment: "Request assigned to approver",
      },
    ],
  });

  return request;
}

async function getPendingRequestsForApprover({
  approverId,
  limit = 50,
  before,
}) {
  const query = {
    approverId,
    status: "PENDING",
  };

  if (before) {
    query.createdAt = { $lt: new Date(before) };
  }

  return UserRequest.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}

async function getRequestsForUser({
  requesterId,
  status,
  limit = 50,
  before,
}) {
  const query = {
    requesterId,
  };

  if (status) {
    query.status = status;
  }

  if (before) {
    query.createdAt = { $lt: new Date(before) };
  }

  return UserRequest.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}

async function approveRequest({ requestId, approverId, comment }) {
  const request = await UserRequest.findOneAndUpdate(
    {
      _id: requestId,
      approverId,
      status: "PENDING",
    },
    {
      $set: {
        status: "APPROVED",
      },
      $push: {
        approvalHistory: {
          status: "APPROVED",
          actorId: approverId,
          comment: comment || "Request approved",
          createdAt: new Date(),
        },
      },
    },
    {
      new: true,
    }
  ).lean();

  return request;
}

module.exports = {
  createUserRequest,
  getPendingRequestsForApprover,
  getRequestsForUser,
  approveRequest,
};