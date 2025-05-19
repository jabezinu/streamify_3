import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import { Toaster } from "react-hot-toast"

export default function App() {
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