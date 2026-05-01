import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { PricePredictionForm } from "./components/PricePredictionForm";
import { ChatInterface } from "./components/ChatInterface";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Building2, MessageSquare, BarChart3, Sparkles, ChevronDown, LogOut } from "lucide-react";


export default function MainApp() {
  const [activeTab, setActiveTab] = useState("predict");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Logout Button - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-lg"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Hero Section - Full Bleed */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NTgxMjY2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">AI-Powered Valuations</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                >
                  Predict Property
                  <br />
                  Values Instantly
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl text-gray-300 max-w-lg"
                >
                  Machine learning meets real estate. Get accurate property valuations in seconds with 94.2% prediction accuracy.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-12 pt-4"
              >
                <div>
                  <div className="text-4xl font-bold">1,247</div>
                  <div className="text-sm text-gray-400">Properties Analyzed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">94.2%</div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Prediction Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Valuation</h2>
                <p className="text-gray-600">Enter property details for instant AI prediction</p>
              </div>
              <PricePredictionForm />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - FIXED: Added Infinity to repeat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-sm">Explore Features</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Intelligent Real Estate Platform</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combining Random Forest algorithms with NLP assistance for data-driven decisions
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-14 mb-12">
              <TabsTrigger value="predict" className="text-base">
                <Building2 className="w-4 h-4 mr-2" />
                Predict
              </TabsTrigger>
              <TabsTrigger value="chat" className="text-base">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-base">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="predict" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold">Advanced ML Prediction</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our Random Forest algorithm analyzes over 20 property attributes including location, square footage, amenities, and market trends to deliver precise valuations.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Real-time price estimation based on current market data",
                      "Customizable parameters for specific property types",
                      "Confidence intervals and prediction ranges",
                      "Historical trend analysis and forecasting"
                    ].map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NTgxMjY2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Property analysis"
                    className="rounded-2xl shadow-2xl w-full"
                  />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="chat" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold">NLP-Powered Assistance</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our intelligent chatbot uses Natural Language Processing to guide you through valuations, explain results, and answer questions about the real estate market.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Real-time guidance through the valuation process",
                      "Detailed explanations of prediction methodology",
                      "Market insights and trend analysis",
                      "24/7 availability for instant support"
                    ].map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <ChatInterface />
              </motion.div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold mb-4">Performance Analytics</h3>
                  <p className="text-gray-600 text-lg">
                    Comprehensive insights into market trends, regional performance, and prediction accuracy
                  </p>
                </div>
                <AnalyticsDashboard />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technology Section */}
<section className="py-32 px-6 lg:px-12 bg-white">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-2 gap-16 items-center"
    >
      {/* Left Image */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1611094016919-36b65678f3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tJTIwcHJlbWl1bXxlbnwxfHx8fDE3NzU4MTI2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern interior"
          className="rounded-2xl shadow-2xl w-full"
        />
      </div>

      {/* Right Content */}
      <div className="space-y-8">
        <h2 className="text-5xl font-bold leading-tight text-gray-900">
          Find the perfect home,
          <br />
          with confidence
        </h2>

        <p className="text-xl text-gray-600 leading-relaxed">
          Smart property search, real-time insights, and seamless
          experiences — all in one place.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              name: "Smart Search",
              desc: "Find homes that match your lifestyle",
            },
            {
              name: "Market Insights",
              desc: "Real-time data to make smarter decisions",
            },
            {
              name: "Schedule Tours",
              desc: "Book visits and connect with agents",
            },
            {
              name: "Trusted & Secure",
              desc: "Verified listings and secure transactions",
            },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 border border-gray-200 rounded-2xl bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="font-bold text-xl text-gray-900 mb-2">
                {item.name}
              </div>
              <div className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-sm">
            © 2026 Real Estate Price Prediction System. Developed by Muhammed Shahal & Shameem Shanu.
          </div>
        </div>
      </footer>
    </div>
  );
}