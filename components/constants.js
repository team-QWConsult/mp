import * as yup from "yup";

export const validationSchema = yup.object({
  full_names: yup.string("Enter your names").required(),
  phone: yup
    .string("Enter a valid phone number")
    .max(14)
    .min(10)
    .required("Phone number is required"),
  email: yup.string().email().required(),
});

export const viewingInitialValues = {
  full_names: "",
  email: "",
  phone: "",
  property_link: "",
  property_id: "",
  urgency: "",
};

export const deadlineOptions = [
  { title: "ASAP", timeline: 2 },
  { title: "This Week", timeline: 7 },
  { title: "End Month", timeline: 30 },
  { title: "Just Exploring", timeline: 90 },
];

export const propertyTypes = [
  { title: "House", value: "house" },
  { title: "Apartment", value: "apartment" },
  { title: "Townhouse", value: "townhouse" },
  { title: "Villa", value: "villa" },
  { title: "Land", value: "land_plot" },
  { title: "Commercial", value: "commercial_property" },
  { title: "Office space", value: "commercial_property" },
];

export const quickLinks = [
  { title: "Blog", link: "/blog" },
  { title: "Request Property", link: "/property-search" },
  { title: "About Us", link: "/about-us" },
  { title: "Contact Us", link: "/contact-us" },
  { title: "Top Locations", link: "/locations" },
];

export const propertiesLinks = [
  { title: "Browse Properties", link: "/properties" },
  { title: "All Properties for rent", link: "/properties-for-rent" },
  { title: "Plots for sale", link: "/land_plot-for-sale" },
  { title: "Land for lease", link: "/land_plot-for-rent" },
  { title: "House for sale", link: "/house-for-sale" },
  { title: "Plots for sale in Kiambu", link: "/land_plot-for-sale-in-kiambu" },
  { title: "Plots for sale in Juja", link: "/land_plot-for-sale-in-juja" },
];
