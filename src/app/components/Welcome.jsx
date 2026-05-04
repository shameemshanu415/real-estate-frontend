import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Building2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  BarChart3,
  Shield,
  Zap,
  Brain,
  MessageSquare
} from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-gray-900">

      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#b8962e]" />
            </div>
            <div>
              <div className="font-semibold">EstateAI</div>
              <div className="text-xs text-gray-500">Price Prediction</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="border-gray-300"
            >
              Sign In
            </Button>

            <Button
              onClick={() => navigate("/login")}
              className="bg-[#c9a227] hover:bg-[#b8962e] text-white"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a227]/10 rounded-full">
              <Sparkles className="w-4 h-4 text-[#c9a227]" />
              <span className="text-sm text-[#b8962e] font-medium">
                 Real Estate Intelligence
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-serif leading-tight">
              House Price <br />
              <span className="text-[#c9a227]">Prediction System</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Make smarter property decisions using AI-powered analytics,
              real-time insights, and 100% grade predictions.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-[#c9a227] hover:bg-[#b8962e] text-white h-14 px-8"
            >
              Start Predicting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* STATS */}
            <div className="flex gap-10 pt-6">
              <div>
                <div className="text-3xl font-semibold">94.2%</div>
                <div className="text-sm text-gray-500">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">1,247+</div>
                <div className="text-sm text-gray-500">Properties</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">500+</div>
                <div className="text-sm text-gray-500">Users</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
                className="h-[550px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />

              {/* FLOAT CARD */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                <div className="text-sm text-gray-500">Predicted Price</div>
                <div className="text-2xl font-bold">₹847,500</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% market value
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif mb-3">Premium Features</h2>
            <p className="text-gray-600">Built for intelligent decisions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "AI Prediction" },
              { icon: MessageSquare, title: "Smart Assistant" },
              { icon: BarChart3, title: "Analytics" },
              { icon: Zap, title: "Fast Results" },
              { icon: Shield, title: "Secure Data" },
              { icon: TrendingUp, title: "Market Trends" }
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-[#c9a227]/10 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="text-[#c9a227]" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        © 2026 EstateAI —  AI Experience
      </footer>
    </div>
  );
}