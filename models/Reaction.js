// const { Schema, model } = require('mongoose');
// const moment = require('moment');

// const ReactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       minLength: 1,
//       maxLength: 280,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//   }
// );
// const Reaction = model("reaction", ReactionSchema)
// module.exports = Reaction;
