import mongoose from "mongoose";

// Define the bucket schema
const bucketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    volume: { type: Number, required: false },
});
const bucket = mongoose.model("bucket", bucketSchema);
export default bucket;
