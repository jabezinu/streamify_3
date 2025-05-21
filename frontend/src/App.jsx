import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export default function App() {
  const {data, isLoading, error} =  useQuery({ 
    queryKey: ["todos"],

    queryFn: async() =>{
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
      return res.data;
    },
  });

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element ={<HomePage />} />
        <Route path="/signup" element ={<SignUp />} />
        <Route path="/login" element ={<Login />} />
        <Route path="/notifications" element ={<NotificationPage />} />
        <Route path="/call" element ={<CallPage />} />
        <Route path="/chat" element ={<ChatPage />} />
        <Route path="/onboarding" element ={<OnBoarding />} />
      </Routes>
      <Toaster />
    </div>
  )
}