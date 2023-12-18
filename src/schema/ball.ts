import mongoose from "mongoose";

// Define the bucket schema
const ballSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
});
const ball = mongoose.model("ball", ballSchema);
export default ball;
