const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes.js')
const mongoose = require('mongoose');
const cors = require('cors');

const { usersRoute } = require('./routes/userRoutes.js');



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.API_URL);
  console.log('data base is conncted');
}

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/health', (req, res) => {
    res.send('Hello')
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', usersRoute)

app.listen(process.env.PORT, () => {
    console.log("server is running");
})