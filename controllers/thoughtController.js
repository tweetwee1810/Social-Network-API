const { User, Thought } = require('../models');

const thoughtController = {
    // Get all thoughts from the database
    async getAllThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts)
        } catch (error) { 
            res.status(500).json(error) 
        }
    },

    // Get a single thought by id from the database
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            thought
                ? res.status(200).json(thought)
                : res.status(404).json({ message: 'Failed to find the thought' })
        } catch (error) { 
            res.status(500).json(error) 
        }
    },

    // Create a new thought and add it to the database
    // Also update the associated user's thought field, and return the user data with populated thoughts
    async postThought(req, res) {
        try {
            // Check if the user exists before creating the thought
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(400).json({ message: 'Couldn\'t find the user matching the username' })
                return;
            }
            const newThought = await Thought.create(req.body);
            // Update the thoughts field in the user document
            const updateUser = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: newThought._id } },
                { new: true })
                // Exclude the __v field from the user document and populate the thoughts field
                .select('-__v')
                .populate('thoughts');
            newThought
                ? res.status(200).json(newThought)
                : res.status(404).json({ message: 'Failed to add new thoughts' })
        } catch (error) { 
            res.status(500).json(error) 
        }
    },

    // Update a single thought by id in the database
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                // Set the new value for the thoughtText field based on the request body
                { $set: { thoughtText: req.body.thoughtText } },
                // Return the updated document instead of the original
                { new: true });
            updatedThought
                ? res.status(200).json(updatedThought)
                : res.status(404).json({ message: 'Failed to update the thought' })
        } catch (error) { 
            res.status(500).json(error) 
        }
    },

    // Delete a single thought by id from the database
    // Also remove the thoughtId from the user document
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id })
            // Update the thoughts field in the user document by removing the deleted thoughtId
             await User.findOneAndUpdate(
                { thoughts: thought._id },
                { $pull: { thoughts: thought._id } });
            thought
                ? res.status(200).json(thought)
                : res.status(404).json({ message: 'Failed to delete the thought' })
        } catch (error) { 
            res.status(500).json(error) 
        }
    }
}

module.exports = thoughtController;
