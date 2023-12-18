
import mongoose from "mongoose";

// Define the bucket schema
const BucketSuggestion = new mongoose.Schema({
    ballName: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});
const BucketS = mongoose.model("BucketS", BucketSuggestion);
export default BucketS;
