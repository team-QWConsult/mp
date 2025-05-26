import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { kebabCase, snakeCase, upperFirst } from "lodash";
import SectionTitle from "../widgets/SectionTitle";

import {
  floorSizeUnitOptions,
  furnishingOptions,
  paymentTermsOptions,
  petsOptions,
  popularFeatures,
  priceUnitsOptions,
  propertyCategories,
  regions,
  sizeUnitOptions,
  validationSchema,
  initialValues,
  getPropertyCategories,
  getSubCategories,
  offerOptions,
} from "./constants";

import { useRouter } from "next/router";
import SelectField from "../widgets/Select";
import StatusModal from "../widgets/StatusModal";
import saveListing from "../../utils/saveListing";
import updateListing from "../../utils/updateListing";
import { Eye, Trash } from "react-feather";
import deleteListing from "../../utils/deleteListing";
import MultipleImagesUpload from "./MultipleImagesUpload";
import { SITE_URL } from "../../utils/constants";
import SocialShare from "../widgets/SocialShare";
import MultiSelect from "../widgets/MultiSelect";
import {
  getAllCountries,
  getAreas,
  getSubCounties,
} from "../../lib/getLocationOptions";
import BoostOptions from "./BoostOptions";
// import ImagesUpload from "./ImagesUpload";

const EditListing = ({ listing = {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const isEditMode = Object.keys(listing).length > 0;

  function formatNumber(value) {
    if (!value) return "";
    const number = parseFloat(value.replace(/,/g, ""));
    if (isNaN(number)) return "";
    return number.toLocaleString();
  }

  function parseNumber(value) {
    return value.replace(/,/g, "");
  }

  const saveListingData = async (data) => {
    setLoading(true);

    try {
      // save to existing doc in Edit mode
      if (isEditMode) {
        // edit doc
        let dataToSave = {
          ...data,
          updated_at: new Date().toString(),
        };
        updateListing(dataToSave, listing.id);

        setLoading(false);
        setSuccess(true);
      } else {
        // create new
        let dataToSave = {
          ...data,
          created_at: new Date().toString(),
          updated_at: new Date().toString(),
        };
        await saveListing(dataToSave);
        setLoading(false);
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);

      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      {isEditMode && (
        <>
          <div className="mb-4 rounded-md p-6 bg-secondary text-white">
            <h2 className="font-bold text-3xl mb-4">
              {listing.marketing_title}
            </h2>
            <span className="text-lg">
              {listing.price_unit}{" "}
              {listing.offer === "sale"
                ? (listing.sale_price || 0).toLocaleString()
                : (listing.rent_price || 0).toLocaleString()}
            </span>

            <div className="mt-6 flex gap-4 items-center flex-wrap">
              <a
                href={`${SITE_URL}/properties/${listing.property_type}-for-${
                  listing.offer
                }-at-${
                  kebabCase(listing.town_suburb) || kebabCase(listing.region)
                }-${listing.id}`}
                className="flex items-center p-2 px-6 rounded-full border gap-3"
              >
                <Eye />
                <span className="text-sm">View Listing</span>
              </a>
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to delete?")) {
                    await deleteListing(listing.id);

                    router.push("/dashboard/listings");
                  } else {
                    return;
                  }
                }}
                className="flex items-center p-2 px-6 rounded-full border gap-3"
              >
                <Trash />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
          <div className="mb-4 rounded-md bg-white p-6">
            <h4 className="uppercase mb-3">Promote on social media:</h4>
            <SocialShare
              description={listing?.description}
              title={listing.marketing_title || listingTitle}
              slug={`properties/${listing.property_type}-for-${
                listing.offer
              }-at-${
                kebabCase(listing.town_suburb) || kebabCase(listing.region)
              }-${listing.id}`}
            />
          </div>
          <div className="mb-4 rounded-md bg-white p-6">
            <h4 className="uppercase mb-3">Boost Options:</h4>
            <BoostOptions listing={listing} />
          </div>
        </>
      )}
      <div className="md:p-6 w-full rounded bg-white">
        <h2 className="text-3xl mb-6 font-bold block p-4 sm:p-0">
          {isEditMode ? "Edit Listing" : "New Listing"}
        </h2>
        <StatusModal success={success} loading={loading} error={error} />
        <div className="add-property">
          <div className="add-property-container">
            <Formik
              initialValues={{ ...initialValues, ...listing }}
              enableReinitialize
              onSubmit={async (values, { setSubmitting }) => {
                // remove empty values and unchanged values
                let listingData = {};

                Object.keys(values).forEach((key) => {
                  if (values[key] !== listing[key] && values[key] !== "") {
                    listingData[key] = values[key];
                  }
                });

                let valuesToSave = {
                  ...listingData,
                  created_date: new Date(),
                  published: true,
                };

                await saveListingData(valuesToSave);

                setSubmitting(false);
              }}
              validationSchema={validationSchema}
            >
              {({
                isSubmitting,
                values,
                initialValues: originalValues,
                dirty,
                setFieldValue,
                handleBlur,
              }) => (
                <Form className="add-property__form">
                  <SectionTitle
                    number={1}
                    title="Property Location"
                    copy="Enter the property's address and city location"
                  />
                  <label className="col-2">
                    Region
                    <Field
                      name="region"
                      className="add-property__form-region"
                      component={SelectField}
                      options={getAllCountries().map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                    <ErrorMessage
                      name="region"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label className="col-2">
                    Town/Suburb
                    <Field
                      name="town_suburb"
                      className="add-property__form-region"
                      component={SelectField}
                      options={(values.region
                        ? getSubCounties(values.region)
                        : []
                      ).map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                    <ErrorMessage
                      name="town_suburb"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label className="col-2">
                    Address
                    <Field
                      name="locality"
                      className="add-property__form-region"
                      component={SelectField}
                      options={(values.town_suburb
                        ? getAreas(values.region, values.town_suburb)
                        : []
                      ).map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                    <ErrorMessage
                      name="locality"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>

                  <label>
                    Address
                    <Field type="text" name="address" placeholder="Address" />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <SectionTitle
                    number={2}
                    title="Property Details"
                    copy="Enter the property details and features"
                  />

                  <label>
                    Property Type
                    <Field
                      name="property_type"
                      component={SelectField}
                      options={getPropertyCategories().map((i) => ({
                        label: i,
                        value: snakeCase(i),
                      }))}
                    />
                    <ErrorMessage
                      name="property_type"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label>
                    Sub Type
                    <Field
                      name="property_sub_type"
                      component={SelectField}
                      options={getSubCategories(values.property_type).map(
                        (i) => ({
                          label: i,
                          value: snakeCase(i),
                        })
                      )}
                    />
                    <ErrorMessage
                      name="property_sub_type"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label className="col-2">
                    Bedroom Count
                    <Field
                      type="number"
                      name="bedroom_count"
                      placeholder="Bedroom Number"
                    />
                    <ErrorMessage
                      name="bedroom_count"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label className="col-2">
                    Bathrooms Count
                    <Field
                      type="number"
                      name="bathroom_count"
                      placeholder="Bathrooms Count"
                    />
                    <ErrorMessage
                      name="bathroom_count"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label className="col-3">
                    Floor Size
                    <Field
                      type="number"
                      name="floor_size"
                      placeholder="Floor Size"
                    />
                    <ErrorMessage
                      name="floor_size"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label className="col-1">
                    {/* Floor Size unit */}
                    <Field
                      name="floor_size_unit"
                      component={SelectField}
                      options={floorSizeUnitOptions.map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                    <div style={{ height: "8px" }} />
                  </label>
                  <label className="col-3">
                    Property Size
                    <Field type="number" name="size" placeholder="Size" />
                    <ErrorMessage
                      name="size"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label className="col-1">
                    {/* Size unit */}
                    <Field
                      name="size_unit"
                      component={SelectField}
                      options={sizeUnitOptions.map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                    <div style={{ height: "8px" }} />
                  </label>

                  <SectionTitle
                    number={3}
                    title="Amenities"
                    copy="Enter any additional amenities and features."
                  />

                  <label className="col-2">
                    Furnishing
                    <Field
                      name="furnishing"
                      component={SelectField}
                      options={furnishingOptions.map((i) => ({
                        label: i,
                        value: kebabCase(i),
                      }))}
                    />
                  </label>

                  <label className="col-2">
                    Pets Allowed
                    <Field
                      name="pets_allowed"
                      component={SelectField}
                      options={petsOptions.map((i) => ({
                        label: i,
                        value: kebabCase(i),
                      }))}
                    />
                  </label>

                  <label>
                    Garages
                    <Field type="number" name="garages" placeholder="Garages" />
                    <ErrorMessage
                      name="garages"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>

                  <h4 className="font-bold mb-4 text-lg">Features</h4>
                  <div className="w-full flex flex-wrap gap-4 p-4 border border-dashed rounded">
                    {popularFeatures.map((feature) => (
                      <label
                        key={feature}
                        className="inline-flex items-center gap-4 rounded border p-2 text-sm !w-auto !mb-0 ring-1 ring-transparent hover:bg-slate-100 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-500"
                      >
                        <input
                          onChange={(e) => {
                            const updatedFeatures = e.target.checked
                              ? [...values.features, feature]
                              : values.features.filter((r) => r !== feature);
                            setFieldValue("features", updatedFeatures);
                          }}
                          className="form-checkbox rounded"
                          type="checkbox"
                          name="features"
                          key={feature}
                          value={feature}
                          checked={values.features.includes(feature)}
                        />

                        <span>{feature}</span>
                      </label>
                    ))}
                  </div>

                  <SectionTitle
                    number={4}
                    title="Marketing"
                    copy="Enter any marketing details, pricing terms and descriptions."
                  />
                  <label>
                    Contract
                    <Field
                      name="offer"
                      component={SelectField}
                      options={offerOptions.map((i) => ({
                        label: upperFirst(i),
                        value: i,
                      }))}
                    />
                    <div style={{ height: "8px" }} />
                  </label>

                  <label
                    className="col-3"
                    hidden={values.offer === "sale" || values.offer === ""}
                  >
                    Renting Price
                    {/* <Field
                      type="number"
                      name="rent_price"
                      placeholder="Price"
                    /> */}
                    <Field name="rent_price">
                      {({ field }) => (
                        <input
                          {...field}
                          value={
                            values?.rent_price_formated ||
                            formatNumber(values.rent_price)
                          }
                          type="text"
                          onChange={(e) => {
                            const raw = parseNumber(e.target.value);
                            if (/^\d*$/.test(raw)) {
                              setFieldValue("rent_price", raw); // unformatted value
                              setFieldValue(
                                "rent_price_formated",
                                formatNumber(raw)
                              ); // formatted display
                            }
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="rent_price"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>

                  <label
                    className="col-3"
                    hidden={
                      values.offer === "rent" ||
                      values.offer === "lease" ||
                      values.offer === "shortlet" ||
                      values.offer === ""
                    }
                  >
                    Sale Price
                    {/* <Field
                      type="number"
                      name="sale_price"
                      placeholder="Price"
                    /> */}
                    <Field name="sale_price">
                      {({ field }) => (
                        <input
                          {...field}
                          value={
                            values?.sale_price_formated ||
                            formatNumber(values.sale_price)
                          }
                          type="text"
                          onChange={(e) => {
                            const raw = parseNumber(e.target.value);
                            if (/^\d*$/.test(raw)) {
                              setFieldValue("sale_price", raw); // unformatted value
                              setFieldValue(
                                "sale_price_formated",
                                formatNumber(raw)
                              ); // formatted display
                            }
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="sale_price"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>

                  <label className="col-1">
                    {/* Price unit */}
                    <Field
                      name="price_unit"
                      component={SelectField}
                      options={priceUnitsOptions.map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                    <div style={{ height: "8px" }} />
                  </label>

                  <label
                    className="col-2"
                    hidden={values.offer === "sale" || values.offer === ""}
                  >
                    Renting Term
                    <Field
                      name="rent_term"
                      component={SelectField}
                      options={paymentTermsOptions.map((i) => ({
                        label: upperFirst(i),
                        value: i,
                      }))}
                    />
                  </label>

                  <label>
                    Marketing Title
                    <Field
                      type="text"
                      name="marketing_title"
                      placeholder="Title"
                    />
                    <ErrorMessage
                      name="marketing_title"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>
                  <label>
                    Description
                    <Field
                      type="text"
                      name="description"
                      placeholder="Description"
                      component="textarea"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>

                  <SectionTitle
                    number={5}
                    title="Media"
                    copy="Add any images, videos clearly showing the property."
                  />
                  <div style={{ width: "100%", marginBottom: 15 }}>
                    Upload Images
                    <Field name="images" component={MultipleImagesUpload} />
                  </div>

                  <label>
                    Video Link
                    <Field
                      type="text"
                      name="video_link"
                      placeholder="Video Link"
                    />
                    <ErrorMessage
                      name="video_link"
                      component="div"
                      className="color--error text-red-500"
                    />
                  </label>

                  <button
                    className="p-4 rounded w-full bg-primary text-white"
                    type="submit"
                    disabled={!dirty}
                  >
                    {dirty ? "Save Listing" : "Saved"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditListing;
