import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUserss, sendFriendRequest } from "../controllers/user.controller.js";

const userRoutes = express.Router()


// apply auth middleeware to all routes
userRoutes.use(protectRoute);

userRoutes.get("/", getRecommendedUserss)
userRoutes.get("/friends", getMyFriends)

userRoutes.post("/friend-request/:id", sendFriendRequest);
userRoutes.put("/friend-request/:id", acceptFriendRequest);

userRoutes.get("/friend-requests", getFriendRequests);
userRoutes.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default userRoutes