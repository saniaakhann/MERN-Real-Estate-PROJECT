import express from "express";

import {
  deleteUser,
  updateUser,
  getUserListings,
  getUser,
  toggleFavorite,
  makeAdmin,
} from "../controllers/user.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);

router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/listings/:id", verifyToken, getUserListings);

router.post("/favorite/:listingId", verifyToken, toggleFavorite);

router.get("/:id", verifyToken, getUser);

// Temporary route to make your account admin
router.get("/make-admin", makeAdmin);

export default router;