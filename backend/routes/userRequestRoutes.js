// routes/userRequestRoutes.js
const express = require("express");
const router = express.Router();

const {
  createUserRequest,
  getPendingRequestsForApprover,
  getRequestsForUser,
  approveRequest,
} = require("../services/userRequestService");

// Create request
router.post("/", async (req, res, next) => {
  try {
    const request = await createUserRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
});

// Approver dashboard
router.get("/approver/:approverId/pending", async (req, res, next) => {
  try {
    const { approverId } = req.params;
    const { limit, before } = req.query;

    const requests = await getPendingRequestsForApprover({
      approverId,
      limit: Number(limit) || 50,
      before,
    });

    res.json({
      items: requests,
      nextCursor:
        requests.length > 0
          ? requests[requests.length - 1].createdAt
          : null,
    });
  } catch (error) {
    next(error);
  }
});

// Requester dashboard
router.get("/requester/:requesterId", async (req, res, next) => {
  try {
    const { requesterId } = req.params;
    const { status, limit, before } = req.query;

    const requests = await getRequestsForUser({
      requesterId,
      status,
      limit: Number(limit) || 50,
      before,
    });

    res.json({
      items: requests,
      nextCursor:
        requests.length > 0
          ? requests[requests.length - 1].createdAt
          : null,
    });
  } catch (error) {
    next(error);
  }
});

// Approve request
router.patch("/:requestId/approve", async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { approverId, comment } = req.body;

    const request = await approveRequest({
      requestId,
      approverId,
      comment,
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found or already processed",
      });
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
});

module.exports = router;