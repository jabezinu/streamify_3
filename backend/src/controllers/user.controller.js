import User from "../models/User.js";

export async function getRecommendedUserss (req, res) {

    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                {_id: {$ne: currentUserId}}, // exclude current user
                {$id: {$nin: currentUser.friends}}, //exclude current user's friends
                {isOnboarded: true}
            ]
        })
        res.status(200).json({recommendedUsers})
    } catch (error) {
        console.error("Error in getRecommendedUser", error.message);
        res.status(500).json({message: "Internal server Error!"})
    }
}

export async function getMyFriends (req, res) {
    try {
        const user = await User.findById(req.user._id)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(user.friends)
    } catch (error) {
        console.error("Error on getMyFriends action: ", error.message);
        res.status(500).json({message: Internal Server error})
    }
}

