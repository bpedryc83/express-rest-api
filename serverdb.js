const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const getData = () => {
  return new Promise(function(resolve, reject) {
    fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        resolve(JSON.parse(jsonString));  
      }
    })
  });
}

app.get('/testimonials/random', (req, res) => {
  getData()
    .then(array => res.send(array[(Math.floor(Math.random() * (array.length)))]));
});

app.get('/testimonials', (req, res) => {
  getData()
    .then(array => res.send(array));
});

app.get('/testimonials/:id', (req, res) => {
  getData()
    .then(array => res.send(array.filter(item => item.id == req.params.id)));
});

app.delete('/testimonials/:id', (req, res) => {
  getData()
    .then(array => {
      const reqIDObject = array.find(item => item.id == req.params.id);
      const indexInArray = array.indexOf(reqIDObject);
      array.splice(indexInArray, 1);
      console.log('1');
      res.send('ok');
      //array.splice(array.indexOf(array.filter(item => item.id == req.params.id)), 1);
    })
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});