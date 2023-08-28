const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

// databases.*.collections.64dbab02c289fae33a89
// databases.*.collections.64d757c1c388b559eba1

module.exports = async function (req, res) {
  const apiKey = req.variables.SECRET_KEY;
  if (!apiKey) {
    throw new Error("Missing API key");
  }

  const client = new sdk.Client();
  const database = new sdk.Databases(client);

  const value = req.variables.APPWRITE_FUNCTION_EVENT.endsWith("create")
    ? 1
    : req.variables.APPWRITE_FUNCTION_EVENT.endsWith("delete")
    ? -1
    : 0;

  if (value === 0) {
    return;
  }

  const isComment = req.variables.APPWRITE_FUNCTION_EVENT.includes(
    "64dbab02c289fae33a89"
  );
  const isReference = req.variables.APPWRITE_FUNCTION_EVENT.includes(
    "64d757c1c388b559eba1"
  );

  const payload = JSON.parse(req.variables.APPWRITE_FUNCTION_EVENT_DATA);

  const postId = payload.postId;

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("Archival")
    .setKey(apiKey)
    .setSelfSigned(true);

  let post = null;
  try {
    post = await database.getDocument(
      "649bf127bdd26e9850cd",
      "64d7565c8f49e3fa094f",
      postId
    );
  } catch (error) {
    throw new Error(error);
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
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    areDevelopersAwesome: true,
  });
};
