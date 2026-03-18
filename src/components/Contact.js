import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Invalid email");
      return;
    }

    alert("Submitting your details...");

    const sfForm = document.createElement("form");
    sfForm.action =
      "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";
    sfForm.method = "POST";

    function addField(name, value) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      sfForm.appendChild(input);
    }

    addField("oid", "00DgK00000GGLth");
    addField(
      "retURL",
      "https://saicharanteja733-beep.github.io/reactprofile/"
    );
    addField("last_name", form.name);
    addField("company", "Website User");
    addField("email", form.email);
    addField("description", form.message);
    addField("lead_source", "Portfolio Website");
    addField("debug", "1");
    addField("debugEmail", "saicharanteja.733@gmail.com");

    // target hidden iframe so user stays on this app and does not navigate away
    sfForm.target = "salesforce-target";
    document.body.appendChild(sfForm);
    sfForm.submit();
    setSubmitted(true);

    setTimeout(() => {
      document.body.removeChild(sfForm);
    }, 2000);
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
      <iframe name="salesforce-target" title="salesforce-target" style={{ display: "none" }} />
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

        {/* Optional ReCAPTCHA placeholder; add your site key if used */}
        {/* <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={() => {}} /> */}

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}
