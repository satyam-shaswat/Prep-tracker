const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173'}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Api is running......');
});
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});