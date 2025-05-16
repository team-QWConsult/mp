import React, { useState } from "react";
import { useRouter } from "next/router";

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    full_names: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Submitting...");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ full_names: "", email: "", message: "" });
        router.push("/success"); // Redirect on success
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Error: Unable to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded-3xl p-6">
      <h2 className="text-3xl font-bold mb-5">Send a message</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
      >
        <label className="block">
          <span className="text-gray-700">Full Name</span>
          <input
            type="text"
            className="mt-1 block w-full"
            placeholder="Full Names"
            name="full_names"
            value={formData.full_names}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-gray-700">Message</span>
          <textarea
            name="message"
            className="mt-1 block w-full"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
          ></textarea>
        </label>
        <div className="md:col-span-2 text-start">
          <button
            type="submit"
            className={`px-6 md:w-1/2 py-4 text-center inline-block rounded-xl rounded-bl-none ${
              isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-primary text-white hover:ring-gold hover:text-gold"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
          {status && <p className="mt-4 text-gray-600">{status}</p>}
        </div>
      </form>
    </div>
  );
};

export default ContactCTA;
