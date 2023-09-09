const { Query } = require("appwrite");
const sdk = require("node-appwrite");

/*
  {
    postId: "64d7ac86405561ce18e2"
  }
*/

module.exports = async function (req, res) {
  const apiKey = req.variables.SECRET_KEY;
  if (!apiKey) {
    throw new Error("Missing API key");
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

  if (!payload.postId) {
    throw new Error("Missing required parameters");
  }

  // post collection 64d7565c8f49e3fa094f
  // comment collection 64dbab02c289fae33a89
  // reference collection 64d757c1c388b559eba1

  let comments = [];
  let references = [];

  try {
    const promise = await database.listDocuments(
      "649bf127bdd26e9850cd",
      "64dbab02c289fae33a89",
      [Query.equal("postId", payload.postId), Query.limit(100)]
    );
    comments = promise.documents;
  } catch (error) {
    throw new Error(error);
  }

  try {
    const promise = await database.listDocuments(
      "649bf127bdd26e9850cd",
      "64d757c1c388b559eba1",
      [Query.equal("postId", payload.postId), Query.limit(100)]
    );
    references = promise.documents;
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    comments,
    references,
  });
};
