//Import the User and Thought models
const { User, Thought } = require('../models');
//Define an object that contains functions to handle user-related operations
const userController = {
    //Function to retrieve all users from the database
    async getAllUser(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (error) { res.status(500).json(error) }
    },

    //Function to retrieve a single user by id from the database, populating its thoughts and friends properties
    async getOneUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
                //to exclude the __v property which stores version related data
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            user
                ? res.status(200).json(user)
                : res.status(404).json({ message: 'Failed to find the user' })
        } catch (error) { res.status(500).json(error) }
    },
   //Function to create a new user in the database
    async postUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            newUser
                ? res.status(200).json(newUser)
                : res.status(404).json({ message: 'Failed to find the user' })
        } catch (error) { res.status(500).json(error) }
    },

    //  Function to update a user's information in the database based on its id
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            updatedUser
                ? res.status(200).json(updatedUser)
                : res.status(404).json({ message: 'Failed to find the user' })
        } catch (error) { res.status(500).json(error) }
    },

    //Function to delete a user from the database based on its id, along with its associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
            if (user) {
                await Thought.deleteMany({ _id: { $in: user.thoughts } });
                res.status(200).json({ message: 'User and associated thoughts deleted' })
            } else {
                res.status(404).json({ message: 'Failed to find the user' })
            }
        } catch (error) { res.status(500).json(error) }
    },

    // Add a friend to a user's friends list
    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            //Check that the friend is not the user themselves
            if (userId === friendId) {
                res.status(400).json({ message: 'Can\t add yourself as your friend' });
                return;
            };
            //Add the friend to the user's friends list
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { friends: friendId } },
                { new: true })
            user
                ? res.status(200).json(user)
                : res.status(404).json({ message: 'Failed to add friend' })
        } catch (error) { res.status(500).json(error) }
    },

    // find the user and remove a friend based on id
    async deleteFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            //check friend shouldn't be user themselves
            if (userId === friendId) {
                res.status(400).json({ message: 'Can\'t delete yourself as a friend' });
                return;
            }
            const friend = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true }
            );
            friend
                ? res.status(200).json(friend)
                : res.status(404).json({ message: 'Failed to remove friends' })
        } catch (error) { res.status(500).json(error) }
    }
}

module.exports = userController;
