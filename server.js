const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 50px;
          }
          form {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            width: 300px;
          }
          input {
            width: 100%;
            padding: 8px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          button {
            padding: 10px;
            width: 100%;
            background-color: #28a745;
            border: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #218838;
          }
        </style>
      </head>
      <body>
        <h2>Submit Your Info</h2>
        <form action="/submit" method="POST">
          <label>Name:</label><br />
          <input name="name" required /><br />
          <label>Email:</label><br />
          <input name="email" type="email" required /><br />
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

// MongoDB Connection
mongoose.connect('mongodb+srv://kavana:Chinnu123@cluster0.fsfshdm.mongodb.net/userData?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas!');
}).catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// Submit
app.post('/submit', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial;
            background: #e6ffe6;
            text-align: center;
            padding: 50px;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px;
            text-decoration: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
          }
          a:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <h2>Thank you, ${user.name}!</h2>
        <a href="/">Go back</a>
      </body>
    </html>
  `);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
