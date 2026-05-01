import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { loginUser } from "../../services/authService";
import {
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ FIXED LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      // ✅ support both token formats
      const token = data.token || data.access;

      if (!token) {
        throw new Error("No token received from backend");
      }

      // ✅ save token
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");

      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response) {
        alert(error.response.data?.message || "Invalid email or password");
      } else {
        alert("Server error! Check backend connection");
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8f5f0]">
      
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600"
          alt="luxury interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 z-20 flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-xl bg-[#d4af37]/20 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center">
          <Building2 className="w-7 h-7 text-[#b8962e]" />
        </div>

        <div className="leading-tight text-gray-900">
          <h2 className="text-2xl font-semibold tracking-wide">
            EstateAI
          </h2>
          <p className="text-xs text-gray-500">
            AI-Powered Real Estate Intelligence
          </p>
        </div>
      </motion.div>

      {/* Main Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="hidden lg:block text-gray-900 space-y-8">
            <h1 className="text-6xl font-serif leading-tight">
              House Price <br /> Prediction System
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Make smarter real estate decisions with AI-powered insights.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "94.2% prediction accuracy",
                "Real-time market analysis",
                "Smart recommendations",
                "Luxury analytics",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a227]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8">
              
              <h2 className="text-4xl font-serif text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 mb-6 text-center">
                Sign in to continue
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                
                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      className="pl-11 h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label>Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-11 pr-11 h-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Button */}
                <Button type="submit" className="w-full h-12">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              {/* Signup */}
              <div className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-[#c9a227] font-semibold"
                >
                  Sign up
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
