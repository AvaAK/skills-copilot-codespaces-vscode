// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

// Read comments from comments.json
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading comments.json');
    }
    res.send(data);
  });
});

// Add a new comment to comments.json
app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading comments.json');
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing comments.json');
      }
      res.send(newComment);
    });
  });
});

// Start web server
app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});