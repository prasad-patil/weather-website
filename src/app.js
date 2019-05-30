const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

// set up paths for public and views.
const publicDirectoryPath = path.join(__dirname, '../', 'public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// set up public directory as a static data to serve up.
app.use(express.static(publicDirectoryPath));

console.log(viewsPath);
// configuration of hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

const title = 'Weather App';
const name = 'Prasad Patil';

app.get('', (req, res) => {
  res.render('index', {
    title,
    name
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title,
    name
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title,
    message: 'This is all help you get.',
    name
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide address.'
    });
  }

  geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err
      });
    }
    weather(latitude, longitude, (err, forecastReport) => {
      if (err) {
        return res.send({
          error: err
        });
      }
      res.send({
        forecastReport,
        location
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.status(404).render('notfound', {
    title,
    name,
    errorText: 'Help not found.'
  });
});

app.get('*', (req, res) => {
  res.status(404).render('notfound', {
    title,
    name,
    errorText: 'Help not found.'
  });
});

app.listen(3000, () => {
  console.log('App listening to port 3000');
});
