require('dotenv').config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// React 빌드 파일 서빙
app.use(express.static(path.join(__dirname, "./build")));

// 모든 경로에 대해 React 앱 반환
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});