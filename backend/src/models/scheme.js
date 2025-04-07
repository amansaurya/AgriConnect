import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Scheme = mongoose.model('Scheme', schemeSchema);
export default Scheme;
