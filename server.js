const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;

const app = express();
const PORT = 3000;

app.use(bodyParser.text());

app.post("/writeFile", async (req, res) => {
  try {
    await fs.writeFile("sample.txt", req.body);
    res.send("File written successfully.");
  } catch (error) {
    res.status(500).send("Error writing file.");
  }
});

app.get("/readFile", async (req, res) => {
  try {
    const content = await fs.readFile("sample.txt", "utf-8");
    res.send(content);
  } catch (error) {
    res.status(500).send("Error reading file.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import express from "express";
// import cors from "cors";

// import { generateUploadURL } from "./s3.js";

// //const app = express();
// //const cors = require("cors");
// const app = express();
// app.use(cors());

// app.use(express.static("front"));

// app.get("/s3Url", async (req, res) => {
//   const url = await generateUploadURL();
//   res.send({ url });
// });

// app.listen(8080, () => console.log("listening on port 8080"));
