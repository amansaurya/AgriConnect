import express from 'express';
import Scheme from '../models/scheme.js';

const router = express.Router();

// Route to get government schemes
router.get('/', async (req, res) => {
    try {
        const schemes = await Scheme.find().sort({ publishDate: -1 });
        res.json(schemes); // Uncommented this line to send response
        console.log(schemes); // Debugging line to check the fetched schemes
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new government scheme
router.post('/', async (req, res) => {
    try {
        const newScheme = new Scheme(req.body);
        const savedScheme = await newScheme.save();
        res.status(201).json(savedScheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a government scheme
router.delete('/:id', async (req, res) => {
    try {
        const deletedScheme = await Scheme.findByIdAndDelete(req.params.id);
        if (!deletedScheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a government scheme

router.put('/:id', async (req, res) => {
    try {
        const updatedScheme = await Scheme.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedScheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }
        res.json(updatedScheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;