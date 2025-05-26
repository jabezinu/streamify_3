import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios"

export default function App() {
  const {data:authData, isLoading, error} =  useQuery({ 
    queryKey: ["authUser"],
    queryFn: async() =>{
      const res = await axiosInstance.get("/auth/me")
      return res.data;
    },
    retry: false,    
  });
  
  const authUser = authData?.user;

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element ={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element ={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element ={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/notifications" element ={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/call" element ={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element ={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element ={authUser ? <OnBoarding /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}