// DEMO / UNVERIFIED catalogue. These codes are local demo identifiers, not OEM part numbers.
// Manufacturer tags are illustrative vehicle-brand groupings, NOT the part manufacturer.
// Model names are enquiry choices only. No product-to-model/year fitment is asserted.
// To expand: add a record with a unique DEMO code and keep its status unverified
// until you have reliable manufacturer documentation for the exact vehicle variant.
const brandModels = {
  Honda: ["Activa", "Shine"],
  Hero: ["Splendor", "Pleasure"],
  TVS: ["Jupiter", "Apache"],
  Bajaj: ["Pulsar", "Platina"],
  Yamaha: ["Fascino", "FZ"],
  Suzuki: ["Access", "Gixxer"],
  "Royal Enfield": ["Classic", "Bullet"]
};
// Generic year choices only; they do not assert production dates for any model.
const catalogueYears = Array.from({ length: 27 }, (_, index) => 2026 - index);
const products = [
  { id: "DEMO-01", name: "Brake Shoe", category: "Brakes", brands: ["Honda", "Hero", "TVS"], description: "Illustrative brake shoe. Dimensions and specifications unverified.", icon: "brake", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-02", name: "Clutch Plate", category: "Clutch & transmission", brands: ["Bajaj", "Yamaha", "Royal Enfield"], description: "Illustrative clutch plate. Plate count, size and specifications unverified.", icon: "clutch", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-03", name: "Air Filter", category: "Filters", brands: ["Honda", "Suzuki", "TVS"], description: "Illustrative air filter. Shape and dimensions unverified.", icon: "filter", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-04", name: "Accelerator Cable", category: "Cables", brands: ["Hero", "Bajaj", "Royal Enfield"], description: "Illustrative accelerator cable. Length and end fittings unverified.", icon: "cable", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-05", name: "Spark Plug", category: "Ignition", brands: ["Honda", "Suzuki", "Yamaha"], description: "Illustrative spark plug. Thread, reach and heat range unverified.", icon: "plug", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-06", name: "Mirror", category: "Mirrors & accessories", brands: ["Hero", "TVS", "Bajaj", "Suzuki", "Yamaha", "Royal Enfield"], description: "Illustrative mirror. Mounting thread and orientation unverified.", icon: "mirror", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-07", name: "Brake Pad", category: "Brakes", brands: ["Honda", "Bajaj", "Yamaha"], description: "Illustrative brake pad. Pad shape, thickness and mounting unverified.", icon: "brake", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-08", name: "Oil Filter", category: "Filters", brands: ["TVS", "Suzuki", "Royal Enfield"], description: "Illustrative oil filter. Filter type, seals and dimensions unverified.", icon: "filter", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-09", name: "Chain Sprocket", category: "Clutch & transmission", brands: ["Hero", "Bajaj", "Yamaha", "Royal Enfield"], description: "Illustrative chain sprocket. Pitch, tooth count and mounting unverified.", icon: "clutch", status: "DEMO / UNVERIFIED" },
  { id: "DEMO-10", name: "Headlight", category: "Lighting", brands: ["Honda", "Hero", "TVS", "Bajaj", "Yamaha", "Suzuki", "Royal Enfield"], description: "Illustrative headlight. Housing, connector and electrical specifications unverified.", icon: "headlight", status: "DEMO / UNVERIFIED" }
];
