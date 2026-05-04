import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import {
  MapPin,
  Building2,
  BedDouble,
  Bath,
  Layers,
  Calendar,
  Wrench,
  Car,
  Home,
  RefreshCcw,
  RotateCcw,
  TrendingUp,
  Info,
} from "lucide-react";
import { predictPrice } from "../../services/predictService";

const STEP_FIELDS = [
  "location",
  "propertyType",
  "bedrooms",
  "bathrooms",
  "floors",
  "yearBuilt",
  "condition",
  "garage",
];

function countFilled(state) {
  return STEP_FIELDS.filter((k) => state[k] !== "").length;
}

const EMPTY_STATE = {
  location: "",
  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  floors: "",
  yearBuilt: "",
  condition: "",
  garage: "",
  sqft: [1800],
};

function FieldSelect({
  icon: Icon,
  label,
  value,
  onValueChange,
  placeholder,
  children,
  disabled,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
        <Icon className="w-3 h-3" />
        {label}
      </Label>

      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={`h-9 rounded-lg border text-sm transition-all ${
            value
              ? "border-border bg-background"
              : "border-border/50 bg-muted/30"
          }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-lg">{children}</SelectContent>
      </Select>
    </div>
  );
}

export function PricePredictionForm() {
  const [form, setForm] = useState(EMPTY_STATE);
  const [predicted, setPredicted] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lockedLocation, setLockedLocation] = useState("");

  const set = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const filled = countFilled(form);
  const allFilled = filled === STEP_FIELDS.length;

  const handlePredict = async () => {
    try {
      setLoading(true);

      const res = await predictPrice({
        area: form.sqft[0],
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        floors: parseInt(form.floors),
        year_built: parseInt(form.yearBuilt),
        condition: form.condition,
        garage: form.garage,
        location: form.location,
        property_type: form.propertyType,
      });

      setLockedLocation(form.location);
      setPrice(res.data.predicted_price);
      setPredicted(true);
    } catch (err) {
      console.error(err);
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setPredicted(false);

  const handleNewPrediction = () => {
    setForm({
      ...EMPTY_STATE,
      location: lockedLocation,
    });
    setPrice(0);
    setPredicted(false);
  };

  const summaryFields = [
    { label: "Location", value: form.location },
    { label: "Type", value: form.propertyType },
    { label: "Bedrooms", value: form.bedrooms ? `${form.bedrooms} BHK` : "" },
    {
      label: "Bathrooms",
      value: form.bathrooms ? `${form.bathrooms} Bath` : "",
    },
    { label: "Floors", value: form.floors },
    { label: "Condition", value: form.condition },
    { label: "Garage", value: form.garage },
    { label: "Year Built", value: form.yearBuilt },
    { label: "Area", value: `${form.sqft[0]} sq ft` },
  ];

  return (
    <div className="w-full max-w-xl font-sans scale-95 origin-top">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-xl overflow-hidden border border-border/40 shadow-xl bg-background"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 bg-zinc-950">
          <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center">
            <Home className="w-5 h-5 text-zinc-200 stroke-[1.5]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-100 tracking-tight">
              Property Valuation
            </h2>
            <p className="text-[10px] font-medium tracking-widest uppercase text-zinc-500">
              AI-Powered Price Estimate
            </p>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!predicted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <FieldSelect
                      icon={MapPin}
                      label="Location"
                      value={form.location}
                      onValueChange={set("location")}
                      placeholder="Select location"
                    >
                      <SelectItem value="downtown">Downtown</SelectItem>
                      <SelectItem value="Suburbs">Suburbs</SelectItem>
                      <SelectItem value="Urban">Urban</SelectItem>
                      <SelectItem value="Rural">Rural</SelectItem>
                    </FieldSelect>

                    <FieldSelect
                      icon={BedDouble}
                      label="Bedrooms"
                      value={form.bedrooms}
                      onValueChange={set("bedrooms")}
                      placeholder="Select BHK"
                    >
                      {["1", "2", "3", "4", "5"].map((n) => (
                        <SelectItem key={n} value={n}>
                          {n === "5" ? "5+ BHK" : `${n} BHK`}
                        </SelectItem>
                      ))}
                    </FieldSelect>

                    <FieldSelect
                      icon={Layers}
                      label="Floors"
                      value={form.floors}
                      onValueChange={set("floors")}
                      placeholder="Select floors"
                    >
                      {["1", "2", "3"].map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </FieldSelect>

                    <FieldSelect
                      icon={Car}
                      label="Garage"
                      value={form.garage}
                      onValueChange={set("garage")}
                      placeholder="Garage?"
                    >
                      <SelectItem value="YES">Yes</SelectItem>
                      <SelectItem value="NO">No</SelectItem>
                    </FieldSelect>
                  </div>

                  <div className="space-y-3">
                    <FieldSelect
                      icon={Building2}
                      label="Property Type"
                      value={form.propertyType}
                      onValueChange={set("propertyType")}
                      placeholder="Select type"
                    >
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </FieldSelect>

                    <FieldSelect
                      icon={Bath}
                      label="Bathrooms"
                      value={form.bathrooms}
                      onValueChange={set("bathrooms")}
                      placeholder="Select baths"
                    >
                      {["1", "2", "3", "4"].map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </FieldSelect>

                    <FieldSelect
                      icon={Wrench}
                      label="Condition"
                      value={form.condition}
                      onValueChange={set("condition")}
                      placeholder="Select condition"
                    >
                      {["excellent", "good", "fair", "poor"].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </FieldSelect>

                    <FieldSelect
                      icon={Calendar}
                      label="Year Built"
                      value={form.yearBuilt}
                      onValueChange={set("yearBuilt")}
                      placeholder="Select year"
                    >
                      {Array.from({ length: 2026 - 1900 + 1 }, (_, i) => {
                        const y = 2026 - i;
                        return (
                          <SelectItem key={y} value={y.toString()}>
                            {y}
                          </SelectItem>
                        );
                      })}
                    </FieldSelect>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-[10px] uppercase tracking-widest">
                      Square Footage
                    </Label>

                    <span className="text-xs font-medium">
                      {form.sqft[0].toLocaleString()} sq ft
                    </span>
                  </div>

                  <Slider
                    min={500}
                    max={5000}
                    step={100}
                    value={form.sqft}
                    onValueChange={set("sqft")}
                  />
                </div>

                <Button
                  onClick={handlePredict}
                  disabled={loading || !allFilled}
                  className="w-full mt-5 h-9 text-sm rounded-lg bg-zinc-950 text-white"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {loading ? "Calculating..." : "Predict Value"}
                </Button>

                <p className="text-[10px] text-muted-foreground text-center mt-3">
                  Estimate based on market data
                </p>
              </motion.div>
            ) : (
              <motion.div key="result" className="space-y-4">
                <div className="relative overflow-hidden bg-zinc-950 rounded-xl p-5 text-center">
                  <p className="text-[10px] uppercase text-zinc-500 mb-2">
                    Estimated Market Value
                  </p>

                  <h1 className="text-3xl font-bold text-white">
                    ₹{price.toLocaleString("en-IN")}
                  </h1>
                </div>

                <div className="bg-muted/40 rounded-lg p-3">
                  <div className="grid grid-cols-3 gap-2">
                    {summaryFields.map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-background border rounded-lg px-2 py-2"
                      >
                        <p className="text-[10px] text-muted-foreground">
                          {label}
                        </p>
                        <p className="text-xs font-medium truncate">
                          {value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleEdit}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCcw className="w-4 h-4 mr-1" />
                    Edit
                  </Button>

                  <Button
                    onClick={handleNewPrediction}
                    className="flex-1 bg-zinc-950 text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    New
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}