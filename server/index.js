require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// connect Database
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
  console.log("DB Connected");
});
mongoose.connection.on("error", (err) => {
  console.log("DB Connection failed with - ", err);
});
// import routes
const clientAuthRoutes = require("./routes/clientAuth.routes");
const managerAuthRoutes = require("./routes/managerAuth.routes");
const authCheckRoutes = require("./routes/authCheck.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const menuRoutes = require("./routes/menu.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const addressRoutes = require("./routes/address.routes");
const orderRoutes = require("./routes/order.routes");
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes middlewares
app.use("/api/auth", clientAuthRoutes);
app.use("/api/auth", authCheckRoutes);
app.use("/api/auth/manager", managerAuthRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/order", orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
