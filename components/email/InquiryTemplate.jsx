import * as React from "react";

export const EmailTemplate = ({
  full_names,
  email,
  phone,
  message,
  property_link,
  property_id,
  urgency,
}) => (
  <div>
    <h3>New website inquiry</h3>

    <ul>
      <li>Date: {new Date().toDateString()}</li>
      <li>Name: {full_names}</li>
      <li>Email: {email}</li>
      <li>Phone: {phone}</li>
      <li>Message: {message}</li>
      <li>Property ID: {property_id}</li>
      <li>Property Link: {property_link}</li>
      <li>Urgency: {urgency || "Normal"}</li>
    </ul>
  </div>
);
