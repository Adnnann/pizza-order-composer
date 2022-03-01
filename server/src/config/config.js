require('dotenv').config();

const password = process.env.PASSWORD
const database = process.env.DATABASE

const config = {
    port: 5000,
    secret: process.env.JWT_SECRET || 'ay+5M9*85&B8W*zp',
    mongoUri: process.env.MONGO_URI || `mongodb+srv://aovcina:${password}@cluster0.hbhrs.mongodb.net/${database}?retryWrites=true&w=majority`
}

export default config;