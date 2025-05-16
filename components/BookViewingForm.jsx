import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import RadioButton from "./widgets/RadioButton";
import {
  viewingInitialValues,
  validationSchema,
  deadlineOptions,
} from "./constants";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const BookViewingForm = ({ link, id }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");

  return (
    <div
      className="bg-white border p-3 lg:p-10 rounded w-full mb-6"
      id="book-viewing"
    >
      <h3 className="font-bold font-serif uppercase text-3xl mb-4">
        Book a Viewing
      </h3>
      <Formik
        initialValues={{
          ...viewingInitialValues,
          property_id: id,
          property_link: link,
        }}
        enableReinitialize
        onSubmit={async (values) => {
          console.log(values);

          //   Save response
          try {
            const response = await fetch("/api/inquiry", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            if (response.ok) {
              router.push("/success"); // Redirect on success
            } else {
              setStatus("Something went wrong. Please try again.");
            }
          } catch (error) {
            setStatus("Error: Unable to send message.");
          }

          router.push("/success");
        }}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          dirty,
          setFieldValue,
          values,
          errors,
          handleChange,
        }) => (
          <Form
            className="py-4 grid gap-3 grid-cols-4"
            name="lead-form"
            method="post"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="lead-form" />
            <input type="hidden" name="property_id" value={id} />
            <input type="hidden" name="property_link" value={link} />
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={handleChange} />
              </label>
            </p>
            <label className="mb-2 block col-span-4 lg:col-span-2">
              <span className="text-sm">Full Names</span>
              <Field
                type="text"
                className="
                    mt-2
                    block
                    w-full
                    
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                name="full_names"
                placeholder="Full Names"
              />
              <ErrorMessage
                name="names"
                component="div"
                className="mt-2 text-red-600"
              />
            </label>
            <label className="mb-2 block col-span-4 lg:col-span-2">
              <span className="text-sm">Email Address</span>
              <Field
                type="email"
                className="
                    mt-2
                    block
                    w-full
                    
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                name="email"
                placeholder="Email Address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-2 text-red-600"
              />
            </label>
            <label className="mb-2 block col-span-4 lg:col-span-2">
              <span className="text-sm">Phone Number</span>
              <Field
                type="text"
                className="
                    mt-2
                    block
                    w-full
                    
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                name="phone"
                placeholder="Phone Number"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="mt-2 text-red-600"
              />
            </label>
            <div className="mb-3 col-span-4 grid grid-cols-3 md:grid-cols-4 gap-3">
              <span className="text-sm col-span-3 md:col-span-4">
                When are you available?
              </span>
              {deadlineOptions.map((i) => (
                <RadioButton
                  key={i.title}
                  value={i.timeline}
                  name="urgency"
                  selectedValue={values.urgency}
                  setFieldValue={setFieldValue}
                >
                  {i.title}
                </RadioButton>
              ))}
            </div>
            <button
              className="col-span-4 cursor-pointer w-full rounded px-4 py-2 disabled:bg-charcoal bg-charcoal text-center hover:bg-slate-800 text-white"
              type="submit"
              disabled={isSubmitting || !dirty}
            >
              {isSubmitting ? "Loading..." : "Send"}
            </button>
            {status && <p className="mt-4 text-gray-600">{status}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookViewingForm;
