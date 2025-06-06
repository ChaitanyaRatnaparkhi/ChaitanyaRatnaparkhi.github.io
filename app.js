// app.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/portfolioDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Message Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

// Portfolio Data
const projects = [
  {
    title: "Web Forum",
    description: "Created a full-stack web forum with API testing and user profiles.",
    tech: "Node.js, MongoDB, Postman",
    link: "https://github.com/ChaitanyaRatnaparkhi/web-forum"
  },
  {
    title: "Enrolleasy",
    description: "Smart student enrollment and dashboard analytics.",
    tech: "React, Express, MongoDB",
    link: "https://github.com/ChaitanyaRatnaparkhi/enrolleasy"
  },
  {
    title: "AI Chatbot",
    description: "Built a chatbot using OpenAI's API and deployed it on Vercel.",
    tech: "React, Node.js, OpenAI API",
    link: "https://github.com/ChaitanyaRatnaparkhi/ai-chatbot"
  },
  {
    title: "E-Commerce Backend",
    description: "Implemented shopping cart logic, payment gateway, and admin dashboards.",
    tech: "Express.js, MongoDB, Stripe API",
    link: "https://github.com/ChaitanyaRatnaparkhi/ecommerce-backend"
  },
  {
    title: "Portfolio Website",
    description: "Responsive personal portfolio with dark mode and project filtering.",
    tech: "Node.js, EJS, Tailwind CSS",
    link: "https://github.com/ChaitanyaRatnaparkhi/ChaitanyaRatnaparkhi.github.io"
  },
  {
    title: "Sentiment Analyzer",
    description: "NLP-based tool to analyze tweets and generate sentiment scores.",
    tech: "Python, NLTK, scikit-learn",
    link: "https://github.com/ChaitanyaRatnaparkhi/sentiment-analyzer"
  }
];


const experience = [
  {
    title: "Junior Software Analyst",
    company: "Innovatus Technologies",
    period: "Jan 2022 – Sep 2022",
    description:
      "Worked on core Java modules and contributed to backend development and debugging.",
  },
  {
    title: "Software Developer Intern",
    company: "Startup Inc.",
    period: "Summer 2023",
    description:
      "Built REST APIs and integrated MongoDB for a web-based analytics dashboard.",
  },
];

const education = [
  {
    degree: "M.S. in Computer Science",
    institution: "Stevens Institute of Technology",
    year: "May 2025",
  },
  {
    degree: "B.E. in Computer Engineering",
    institution: "University of Pune",
    year: "2021",
  },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { projects, experience, education });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await Message.create({ name, email, message });
    res.send("Message stored successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to save message.");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
