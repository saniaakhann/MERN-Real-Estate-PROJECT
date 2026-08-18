import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

// Update User
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(req.params.id);

    res.clearCookie("access_token");

    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

// Get User Listings
export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });

      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

// Get User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Add or Remove Favorite
export const toggleFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const listingId = req.params.listingId;

    const alreadyFavorite = user.favorites.includes(listingId);

    if (alreadyFavorite) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== listingId
      );
    } else {
      user.favorites.push(listingId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

// Make User Admin
export const makeAdmin = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      "6a843a6d88d9dd8a9be03a77",
      { $set: { role: "admin" } },
      { new: true }
    );

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      message: "User is now admin!",
      user,
    });
  } catch (error) {
    next(error);
  }
};