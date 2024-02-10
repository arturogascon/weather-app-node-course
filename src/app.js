const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const PORT = process.env.PORT;

// Paths
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup HBS engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to use
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {title: 'Weather App ', name: 'Arturo Gascon'});
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About ', name: 'Arturo Gascon'});
});

app.get('/help', (req, res) => {
  res.render('help', {title: 'Help ', name: 'Arturo Gascon', helpText: 'This is some help text'});
});

app.get('/help/*', (req, res) => {
  res.render('404', {title: 'Help ', name: 'Arturo Gascon', errorMessage: 'Help article not found'});
});

app.get('/weather', ({query: {address}} = {}, res) => {
  if (!address) {
    return res.send({error: 'You must provide an address query'});
  }

  geocode(address, (geocodeError, geocodeData) => {
    if (geocodeError) {
      return res.send({error: geocodeError});
    }

    const {latitude, longitude, location} = geocodeData;

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({error: forecastError.toString()});
      }

      res.send({address, location, forecast: forecastData});
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {title: 'Help ', name: 'Arturo Gascon', errorMessage: '404 error. Page not found'});
});

app.listen(PORT, () => {
  console.log('Server is up on port ' +  PORT);
});
