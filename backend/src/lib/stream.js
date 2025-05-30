import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret) {
    console.log("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.log("Error upserting Strem user : ", error);
        
    }
};

// TODO: do it later
export const generateStreamToken =(userId) => {
    try {
        // ensure user id is  a string 
        const token = streamClient.createToken(userId.toString())
        return token
    } catch (error) {
        console.log("Error generating Stream token: ", error);
        
    }
}