const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express config
const public_directory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlbars location and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(public_directory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kabir"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Kabir"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Kabir",
    helpMsg: "Get help 24x7"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

// 404 page for /help
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Kabir",
    message: "Help article not found"
  });
});

// 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kabir",
    message: "Page not found!"
  });
});

// Start server
app.listen(3000, () => {
  console.log("App started on port 3000");
});
