const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const wed_pack_router = require("./Routes/wedding-pack-route");
const wed_serve_location_router = require("./Routes/wed_serve_location");
const facilties_and_services_router = require("./Routes/facilites_services");
const category_router = require("./Routes/Category");
const image_to_gallery_router = require("./Routes/saveGalleryImages");
require("dotenv").config({
  path: "./applicationProperties.env",
});
require("./config/DBconnection");
const PORT = process.env.PORT;
const path = require("path");
app.use(express.json());
app.use(cors());
/* API ENPOINTS */
app.use("/", wed_pack_router);
app.use("/", wed_serve_location_router);
app.use("/", facilties_and_services_router);
app.use("/", category_router);
app.use("/", image_to_gallery_router);
/* API ENPOINTS */

/* --------------------------------------------------------------------------------------------------- */

/* IMAGE ENPOINT */
app.use("/resources", express.static(path.join(__dirname, "images")));
/* IMAGE ENPOINT */

app.listen(PORT, () => {
  console.log(`the port is ready to listen on port ${PORT}`);
});
