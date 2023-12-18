import express from "express";
import mongoose from "mongoose";
import bucket from "./src/schema/bucket";
import bodyParser from "body-parser";
import path from "path";
import ball from "./src/schema/ball";

const app = express();
app.use(express.json());
const port = 3000;
const MONGO_URL = "mongodb://0.0.0.0:27017/ball_and_bucket";
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// connection to DataBase
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL).then(() => {
    console.log("\n*************MONGODB connected**************\n");
}).catch(error => {
    console.log("unable to connect with database:", error);
});



// API endpoint for creating a new bucket
app.post('/buckets', async (req, res) => {
    const { name, volume } = req.body;
    try {
        const bucketData = await bucket.find({ name: name });
        if (bucketData) {
            return res.status(400).json({
                message: "Bucket already exists"
            })
        } else {
            const newBucket = new bucket({ name, volume });
            await newBucket.save();
            res.status(200).json({
                message: "Bucket created successfully",
                newBucket
            });
        }
    } catch (error) {
        console.error('Error creating bucket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint for creating a new ball
app.post('/balls', async (req, res) => {
    const { color, size } = req.body;
    const ballData = await ball.find({ color: color });
    try {
        if (ballData) {
            return res.status(400).json({
                message: "Ball already exists"
            })
        } else {
            const newBall = new ball({ color, size });
            await newBall.save();
            res.json({
                message: "Ball created successfully",
                newBall
            });
        }
    } catch (error) {
        console.error('Error creating ball:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint for get all balls
app.get('/balls', async (req, res) => {
    try {
        // Fetch all balls from the 'balls' collection
        const allBalls = await ball.find();
        res.status(200).json({ msg: "success!", data: allBalls });
    } catch (error) {
        console.error('Error fetching balls:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint for get all buckets
app.get('/getBuckets', async (req, res) => {
    try {
        const allBuckets = await bucket.find();
        if (allBuckets) {
            res.status(200).json({ msg: "success!", data: allBuckets });
        } else {
            res.status(400).json({ msg: "Create new ball" });
        }
    } catch (error) {
        console.error('Error fetching allBuckets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});