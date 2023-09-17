const { Query } = require("appwrite");
const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const apiKey = req.variables.SECRET_KEY;
  const dbKey = req.variables.DATABASE_KEY;
  const commentKey = req.variables.COMMENT_COLLECTION_KEY;
  const postKey = req.variables.POST_COLLECTION_KEY;

  if (!apiKey | !dbKey | !commentKey | !postKey) {
    throw new Error("Missing secret key");
  }

  const client = new sdk.Client();
  const database = new sdk.Databases(client);

  client
    .setEndpoint("https://appwrite.archivals.eu/v1")
    .setProject("Archival")
    .setKey(apiKey)
    .setSelfSigned(true);

  const payload = JSON.parse(
    req.payload.replace(/\n|\s{2,}/g, "").replace(/(\w+):/g, '"$1":')
  );

  if (!payload.userId) {
    throw new Error("Missing required userId parameter");
  }

  const { userId } = payload;
  let comments = [];

  try {
    const userComments = await database.listDocuments(dbKey, commentKey, [
      Query.equal("userId", [userId]),
    ]);
    userComments.documents.forEach((document) => {
      comments.push({
        commentAuthor: document.userId,
        comment: document.comment,
        postTitle: document.post.postTitle,
        postPicture: document.post.postPictureLink,
        postAuthor: document.post.userId,
      });
    });
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    comments,
  });
};
