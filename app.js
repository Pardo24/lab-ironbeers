const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render("beers.hbs",{ beersFromApi });
    })
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res)=>{
  punkAPI
  .getRandom()
  .then(randomBeer=> {
    res.render("random-beer.hbs",randomBeer[0])
    console.log(randomBeer)
  })
  .catch(error => console.log(error))
})




// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});



app.listen(8008, () => console.log('🏃‍ on port 8008'));
