const { Query } = require("appwrite");
const sdk = require("node-appwrite");

/*
  {
    seasonId: "driesvannoten-m-rtw-ss-2024",
    offset: 0,
    limit: 10
  }
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  const database = new sdk.Databases(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("Archival")
    .setKey(
      "b2e1a0b7c7c2c0bd5a876b67795c6d6bd40700afc742a580e878979b88daed2fde4d21ff24836fcaf7e09b51726be84b3e20cc20e5ae5a018088e0d27b23ebdb27fde66a7569a71b34f0274b26e10c0e7fa7762c24aeb6a54db4d848c5896a375179f5018e673f0125a9471b3071b00ad199ad76b01751faac357598c3130649"
    )
    .setSelfSigned(true);

  const payload = JSON.parse(
    req.payload.replace(/\n|\s{2,}/g, "").replace(/(\w+):/g, '"$1":')
  );

  if (!payload.seasonId) {
    throw new Error("Missing required parameters");
  }

  // post collection 64d7565c8f49e3fa094f
  // comment collection 64dbab02c289fae33a89
  // reference collection 64d757c1c388b559eba1

  const limit = payload.limit || 10;
  const offset = payload.offset || 0;

  let posts = [];

  try {
    const promise = await database.listDocuments(
      "649bf127bdd26e9850cd",
      "64d7565c8f49e3fa094f",
      [
        Query.equal("seasonId", payload.seasonId),
        Query.limit(limit),
        Query.offset(offset),
      ]
    );
    posts = promise.documents;
  } catch (error) {
    throw new Error(error);
  }

  console.log(payload.seasonId)
  console.log(posts);

  for (let i = 0; i < posts.length; i++) {
    try {
      const post = posts[i];
      const promise = await database.listDocuments(
        "649bf127bdd26e9850cd",
        "64dbab02c289fae33a89",
        [Query.equal("postId", post["$id"]), Query.limit(100)]
      );
      post.comments = promise.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  for (let i = 0; i < posts.length; i++) {
    try {
      const post = posts[i];
      const promise = await database.listDocuments(
        "649bf127bdd26e9850cd",
        "64d757c1c388b559eba1",
        [Query.equal("postId", post["$id"]), Query.limit(100)]
      );
      post.references = promise.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  console.log(posts);

  res.json(posts);
};
