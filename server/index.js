import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/leads", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Name, email and message are required." });
  }

  const payload = new URLSearchParams({
    oid: "00DgK00000GGLth", // replace with your Salesforce org ID
    retURL: "https://saicharanteja733-beep.github.io/reactprofile/",
    last_name: name,
    company: "Website User",
    email,
    description: message,
    lead_source: "Portfolio Website"
  });

  try {
    const response = await fetch("https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8", {
      method: "POST",
      body: payload
    });

    const success = response.status >= 200 && response.status < 400;
    if (!success) {
      return res.status(500).json({ success: false, error: "Salesforce responded with non-OK status " + response.status });
    }

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Salesforce proxy listening on port ${PORT}`);
});