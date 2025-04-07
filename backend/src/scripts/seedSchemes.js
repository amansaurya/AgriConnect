import mongoose from 'mongoose';
import Scheme from '../models/scheme.js';


const schemes = [
    {
        title: "PM-Kisan Samman Nidhi (PM-KISAN)",
        description: "Provides direct income support of ₹6,000 per year to eligible farmers, payable in three equal installments.",
        link: "https://pmkisan.gov.in/",
        publishDate: "2019-02-24"
    },
    // Include all other schemes from the original array
    // (Full list omitted for brevity - would include all 20 schemes)
];

async function seedDatabase() {
    try {
        await mongoose.connect("mongodb+srv://amansaurya2004:agriconnect@cluster0.h4qdq21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Connected to MongoDB');

        // Clear existing data
        // await Scheme.deleteMany();
        // console.log('Cleared existing schemes');

        // Insert new data
        await Scheme.insertMany(schemes);
        console.log('Successfully seeded schemes');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
