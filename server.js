const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// ✅ Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve HTML form directly (no index.html needed)
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <label>Name:</label><input name="name" required /><br />
      <label>Email:</label><input name="email" required /><br />
      <button type="submit">Submit</button>
    </form>
  `);
});

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://kavana:Chinnu123@cluster0.fsfshdm.mongodb.net/userData?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// ✅ Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// ✅ Handle form submission
app.post('/submit', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(`<h3>Thank you, ${user.name}!</h3><a href="/">Go back</a>`);
});

// ✅ Show all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
