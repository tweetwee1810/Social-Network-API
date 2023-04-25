const router = require('express').Router();

const { getAllThought, getOneThought, postThought, deleteThought, updateThought } = require('../../controllers/thoughtController');
const { addReaction, deleteReaction } = require('../../controllers/reactionController');

// Routes for thoughts
// router.get('/', getAllThought);
router.route('/').get(getAllThought);
router.post('/', postThought);
router.get('/:id', getOneThought)
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);

// Routes for reactions on thoughts
router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;