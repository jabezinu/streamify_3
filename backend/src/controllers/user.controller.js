import FriendRequest from "../models/FriendRequest.js";
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
        res.status(500).json({message: "Internal Server error"})
    }
}

export async function sendFriendRequest (req, res) {
    try {
        const myId = req.user.id;
        const {id:recipientId} = req.params;

        //prevent sending req to yourself
        if(myId == recipientId) {
            return res.status(400).json({message: "You can't send friend request to yourself!"})
        }
        
        // if user dont exist
        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message: "Recipient not found"});
        }
        
        // check if user is alread friend
        if(recipient.friends.includes(myId)){
            return res.status(404).json({message: "Recipient is friend"});
        }

        // check if a req already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId},
                { sender: recipient, recipient: myId},
            ],
        })
        if(existingRequest){
            return res
            .status(400)
            .json({message: "A friend request already exists between you and this user"})

        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(friendRequest)
    } catch (error) {
        console.error("Error on getMyFriends action: ", error.message);
        res.status(500).json({message: "Internal Server error"})
        
    }
}

export async function acceptFriendRequest (req, res) {
    try {
        const {id:requestId} = req.params;

        // Verify the current user is the recipient
        const friendRequest = await FriendRequest.findById(requestId);
        if(friendRequest.recipient.toString() !== req.user.id ){
            return res.status(403).json({message: "You are not authorized to accept this request"})
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to the other's friends array
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {friends: friendRequest.recipient },
        });
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friends: friendRequest.recipient },
        });

        res.status(200).json({message: "Friend request accepted."})
    } catch (error) {
        console.error("Error on getMyFriends action: ", error.message);
        res.status(500).json({message: "Internal Server error"})
        
    }
}