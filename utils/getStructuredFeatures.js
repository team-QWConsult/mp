import { includes } from "lodash";

// Features
const internalFeatures = [
  "En Suite Bathrooms",
  "Fully Furnished",
  "Air Conditioning(AC)",
  "Fully Equiped Kitchen",
  "Pantry",
  "Hot water",
  "Walk In Closet",
  "Large Wardrobes",
  "Wooden Flooring",
  "Sunken Livingroom",
  "Island Kitchen",
  "Inbuilt Appliances",
];

const externalFeatures = [
  "Terrace",
  "Servants Quarters",
  "Private pool",
  "Private Gym",
  "Balcony",
  "Patio",
  "Gym",
  "Swimming Pool",
  "Children play area",
  "DSQ",
  "Garden",
  "Garage",
  "Car Port",
  "BBQ",
  "Gazebo",
];

const perksFetures = [
  "Solar",
  "Elevator",
  "Wifi",
  "Backup Generator",
  "Alarm",
  "CCTV cameras",
  "Electric Fence",
  "Serviced",
  "Parking",
  "24hrs Security",
];

const otherFeatures = [
  "Prepaid Electricity",
  "Guest House",
  "Cloak Room",
  "Paved Driveway",
  "Perimeter Fence/Wall",
];

const nearbyFeatures = [
  "Bus Stop",
  "Hospital",
  "School",
  "Beach Access",
  "Waterfront",
  "Sea View",
  "Shopping Mall",
];

// property Features
export const popularFeatures = [
  ...internalFeatures,
  ...externalFeatures,
  ...perksFetures,
  ...otherFeatures,
  ...nearbyFeatures,
];

export const getStructuredFeatures = (features) => {
  let internal = features.filter((i) => includes(internalFeatures, i));
  let external = features.filter((i) => includes(externalFeatures, i));
  let nearby = features.filter((i) => includes(nearbyFeatures, i));
  let perks = features.filter((i) => includes(perksFetures, i));
  let others = features.filter((i) => includes(otherFeatures, i));

  return {
    internal,
    external,
    nearby,
    perks,
    others,
  };
};
