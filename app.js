const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes.js')
const mongoose = require('mongoose');
const cors = require('cors');

const { usersRoute } = require('./routes/userRoutes.js');


dotenv.config()

const app = express()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.API_URL);
  console.log('data base is conncted');
}



app.use(cors())

app.use(express.json())

app.get('/health', (req, res) => {
    res.send('Hello')
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', usersRoute)
app.get('/', (req, res) => {
    res.send('Backend is running on Vercel 🚀');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;