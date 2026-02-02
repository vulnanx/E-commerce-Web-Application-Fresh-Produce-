import { connect } from 'mongoose';
import router from './router.js';
import express, { urlencoded, json } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

const MONGO_CONNECTION_STRING = "mongodb+srv://useruser:pwpword@cluster0.xok5w7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(urlencoded({extended: true}));
app.use(json());
router(app);

// DATABASE CONNECTION 
const connectDB = async () => {
    try {
        await connect(MONGO_CONNECTION_STRING, {
            dbName: "HarvestHubDB",
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err; // Re-throw to handle in server.js
    }
}

// START SERVER FUNCTION
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });      
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();