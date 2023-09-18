import { Client, Databases } from 'node-appwrite';

const t = async ({ req, res, log, error }) => {
  if (req.method === 'POST') {
    const apiKey = process.env.SECRET_KEY;
    if (!apiKey) {
      error("Missing API key");
      return;
    }
  
    const client = new Client();
    const database = new Databases(client);

    const value = req.headers["x-appwrite-event"].endsWith("create")
    ? 1 : req.headers["x-appwrite-event"].endsWith("delete")
    ? -1 : 0;

    if (value === 0) {
      error("Unknown event type")
      return res.empty();
    }

    const isComment = req.headers["x-appwrite-event"].includes("64dbab02c289fae33a89");
    const isReference = req.headers["x-appwrite-event"].includes("64d757c1c388b559eba1");

    const payload = JSON.parse(req.body);
    const postId = payload.post?.$id;
  
    client
      .setEndpoint("https://appwrite.archivals.eu/v1")
      .setProject("Archival")
      .setKey(apiKey)
      .setSelfSigned(true);
  
    if (!payload.userId) {
      error("Missing required userId parameter");
      return;
    }

    let post = null;
    try {
      post = await database.getDocument(
        "649bf127bdd26e9850cd",
        "64d7565c8f49e3fa094f",
        postId
      );
    } catch (err) {
      error(err);
      return;
    }

    const toUpdate = {};
    if (isComment) {
      toUpdate.commentsCount = (post["commentsCount"] || 0) + value;
    } else if (isReference) {
      toUpdate.referencesCount = (post["referencesCount"] || 0) + value;
    }

    try {
      await database.updateDocument(
        "649bf127bdd26e9850cd",
        "64d7565c8f49e3fa094f",
        postId,
        toUpdate
      );
    } catch (err) {
      error(err);
      return;
    }
    return res.empty();
  }

  return res.send("we shouldn't get there");
};

export default t;
