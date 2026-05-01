import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { TrendingUp, Home, DollarSign, Users } from "lucide-react";

const priceData = [
  { month: "Jan", price: 285000 },
  { month: "Feb", price: 295000 },
  { month: "Mar", price: 310000 },
  { month: "Apr", price: 305000 },
  { month: "May", price: 325000 },
  { month: "Jun", price: 340000 },
];

const regionData = [
  { region: "Downtown", avg: 450000 },
  { region: "Suburbs", avg: 320000 },
  { region: "Outskirts", avg: 250000 },
  { region: "Waterfront", avg: 580000 },
];

export function AnalyticsDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* KPI Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: "Avg. Property Value", value: "$325,000", change: "+12.3%", icon: TrendingUp },
          { label: "Properties Analyzed", value: "1,247", change: "+8.7%", icon: Home },
          { label: "Active Users", value: "3,421", change: "+23.1%", icon: Users },
          { label: "Prediction Accuracy", value: "94.2%", change: "+2.1%", icon: DollarSign },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 border rounded-xl bg-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium text-green-600">{metric.change}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className="text-sm text-gray-500">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 border rounded-xl bg-white"
        >
          <h3 className="text-lg font-semibold mb-6">Price Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 border rounded-xl bg-white"
        >
          <h3 className="text-lg font-semibold mb-6">Regional Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="region" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="avg" fill="#0e54ea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}