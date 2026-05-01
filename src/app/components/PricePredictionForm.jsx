import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Building2, MapPin, Home, TrendingUp } from "lucide-react";
import { predictPrice } from "../../services/predictService";
import { loginUser } from "../../services/authService";

export function PricePredictionForm() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [sqft, setSqft] = useState([1500]);
  const [bedrooms, setBedrooms] = useState("");
  const [predicted, setPredicted] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    try {
      setLoading(true);

      const res = await predictPrice({
        area: sqft[0],                  // backend expects "area"
        bedrooms: parseInt(bedrooms),   // convert to number
        location,
        property_type: propertyType,
      });

      console.log("API Response:", res.data);

      setPrice(res.data.predicted_price);
      setPredicted(true);
    } catch (error) {
      console.error("Prediction Error:", error);
      alert("Something went wrong. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {!predicted ? (
          <>
            <div className="space-y-4">

              {/* Location */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="suburbs">Suburbs</SelectItem>
                    <SelectItem value="outskirts">Outskirts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Property Type
                </Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Square Feet */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Square Footage
                  </span>
                  <span className="font-mono text-sm">{sqft[0]} sq ft</span>
                </Label>
                <Slider
                  min={500}
                  max={5000}
                  step={100}
                  value={sqft}
                  onValueChange={setSqft}
                  className="py-4"
                />
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* BUTTON */}
            <Button
              onClick={handlePredict}
              disabled={!location || !propertyType || !bedrooms || loading}
              className="w-full h-12 text-base"
              size="lg"
            >
              {loading ? "Predicting..." : "Predict Value"}
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* RESULT CARD */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-100">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Estimated Value
                </div>
                <div className="text-5xl font-bold tracking-tight mb-4">
                  ₹{price.toLocaleString()}
                </div>
              </div>
            </div>

            {/* RANGE */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">₹{(price * 0.9).toLocaleString()}</div>
                <div className="text-xs text-gray-500">Low</div>
              </div>
              <div>
                <div className="text-xl font-bold">₹{price.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Predicted</div>
              </div>
              <div>
                <div className="text-xl font-bold">₹{(price * 1.1).toLocaleString()}</div>
                <div className="text-xs text-gray-500">High</div>
              </div>
            </div>

            {/* RESET */}
            <Button
              onClick={() => setPredicted(false)}
              variant="outline"
              className="w-full"
            >
              New Prediction
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}