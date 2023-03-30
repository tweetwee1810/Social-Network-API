const { User, Thought } = require('../models');

const userController = {
    async getAllUser(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (error) { res.status(500).json(error) }
    },

    //find one user and populate the thoughts and friends
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

    async postUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            newUser
                ? res.status(200).json(newUser)
                : res.status(404).json({ message: 'Failed to find the user' })
        } catch (error) { res.status(500).json(error) }
    },

    // update the user based on the id 
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

    //delete the user and the associated thoughts
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

    // find the user and add a friend based on id
    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            //check friend shouldn't be user themselves
            if (userId === friendId) {
                res.status(400).json({ message: 'Can\t add yourself as your friend' });
                return;
            };
            //$addToSet only push the data not already exists.
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { friends: friendId } },
                { new: true })
            user
                ? res.status(200).json(user)
                : res.status(404).json({ message: 'Failed to add friends' })
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
