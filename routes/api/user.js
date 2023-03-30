const router = require('express').Router();
const userController = require('../../controllers/userController');

// GET all users
router.get('/', userController.getAllUser);

// GET a single user by ID
router.get('/:id', userController.getOneUser);

// POST a new user
router.post('/', userController.postUser);

// PUT update a user by ID
router.put('/:id', userController.updateUser);

// DELETE a user and their associated thoughts
router.delete('/:id', userController.deleteUser);

// POST add a friend to a user by ID
router.post('/:userId/friends/:friendId', userController.addFriend);

// DELETE remove a friend from a user by ID
router.delete('/:userId/friends/:friendId', userController.deleteFriend);

module.exports = router;
