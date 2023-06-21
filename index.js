const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
require("./middleware/common")(app);
// ejs engine & views
app.set("view engine", "ejs");

// Routes`
app.use("/api", require("./routes"));
app.use("/", require("./views/routes"));

// Server
app.listen(PORT || 5000, () => {
  console.log(`server is listening on port:${PORT}`);
});
