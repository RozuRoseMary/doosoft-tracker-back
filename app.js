require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const trackerRoute = require("./routes/trackerRoute");

const app = express();
const { sequelize } = require("./models");
const authenticate = require("./middleware/authenticate");
// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", authenticate, userRoute);
app.use("/tracker", authenticate, trackerRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server running on : " + port);
});
