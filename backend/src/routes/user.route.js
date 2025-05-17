import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyFriends, getRecommendedUserss } from "../controllers/user.controller.js";

const userRoutes = express.Router()


// apply auth middleeware to all routes
userRoutes.use(protectRoute);

userRoutes.get("/", getRecommendedUserss)
userRoutes.get("/friends", getMyFriends)

export default userRoutes