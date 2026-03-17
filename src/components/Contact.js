import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    // ✅ Validation
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Invalid email");
      return;
    }

    // ✅ Show user feedback
    alert("Submitting your details...");

    // 🔥 Create Salesforce form dynamically
    const sfForm = document.createElement("form");
    sfForm.action =
      "https://webto.salesforce.com/servlet/servlet.WebToLead";
    sfForm.method = "POST";

    function addField(name, value) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      sfForm.appendChild(input);
    }

    // 🔴 REQUIRED CONFIG
    addField("oid", "YOUR_ORG_ID"); // 👉 Replace with your Salesforce Org ID

    addField(
      "retURL",
      "https://saicharanteja733-beep.github.io/portfolio-v1/"
    );

    // 🔴 REQUIRED FIELDS (Salesforce Mandatory)
    addField("last_name", form.name);
    addField("company", "Website User");

    // 🟢 OPTIONAL FIELDS
    addField("email", form.email);
    addField("description", form.message);
    addField("lead_source", "Portfolio Website");

    // Submit form to Salesforce
    document.body.appendChild(sfForm);
    sfForm.submit();
  }

  return (
    <section
      className="contact"
      style={{
        padding: "40px",
        textAlign: "center"
      }}
    >
      <h2>Contact Me</h2>
      <p>Let’s work together or ask anything.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={{ padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={{ padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          style={{ padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send Message
        </button>
      </form>
    </section>
  );
}