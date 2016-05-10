import thinky from '../thinkyConfig.js';
// import { io } from '../../server.js';
// Object destructuring issue (https://github.com/neumino/thinky/issues/351)
const r = thinky.r;
const type = thinky.type;

const Comment = thinky.createModel('Comment', {
  id: type.string(),
  authorId: type.string().required(),
  content: type.string().required(),
  ideaId: type.string().required(),
  createdAt: type.date().default(r.now),
});

export default Comment;

// Relationship defined after export following docs to handle circular reference,
// require used instead of import due to same issue (https://github.com/neumino/thinky/issues/399)
const Idea = require('./Idea').default;
const User = require('./User').default;
Comment.belongsTo(User, 'author', 'authorId', 'id');
Comment.belongsTo(Idea, 'idea', 'ideaId', 'id');
Comment.ensureIndex('createdAt');

// // Initialize change feed on Idea
// Idea.changes().then((feed) => {
//   feed.each((error, doc) => {
//     if (error) {
//       console.log(error);
//       process.exit(1);
//     }
//     if (doc.isSaved() === false) {
//       // The following document was deleted:
//       const docToDelete = Object.assign({ toBeDeleted: true }, doc);
//       io.sockets.in(doc.boardId).emit('idea', docToDelete);
//     } else if (!doc.getOldValue()) {
//       // A new document was inserted:
//       console.log(doc.boardId);
//       io.sockets.in(doc.boardId).emit('idea', doc);
//     } else {
//       // A document was updated.
//       io.sockets.in(doc.boardId).emit('idea', doc);
//     }
//   });
// }).error((error) => {
//   console.log(error);
//   process.exit(1);
// });