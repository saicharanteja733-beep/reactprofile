import { useState } from "react";

const LEAD_API_URL = process.env.REACT_APP_LEAD_API_URL || "http://localhost:3001/api/leads";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(LEAD_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not send lead. Please try again later.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="contact-section" style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem", textAlign: "center" }}>
        <h2>Thank you!</h2>
        <p>Your message has been sent successfully. I will get back to you soon.</p>
      </section>
    );
  }

  return (
    <section className="contact-section" style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem" }}>
      <h2>Contact Me</h2>
      <p>Please use the form below to send me a message.</p>
      {error && (
        <div style={{ color: "#a00", background: "#fee", padding: "0.75rem", borderRadius: "0.1875rem" }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
