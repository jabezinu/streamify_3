import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getMyFriends, getRecommendedUserss, sendFriendRequest } from "../controllers/user.controller.js";

const userRoutes = express.Router()


// apply auth middleeware to all routes
userRoutes.use(protectRoute);

userRoutes.get("/", getRecommendedUserss)
userRoutes.get("/friends", getMyFriends)

userRoutes.post("/friend-reques/:id", sendFriendRequest);
userRoutes.post("/friend-reques/:id", acceptFriendRequest);

export default userRoutes