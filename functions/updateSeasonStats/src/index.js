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
  const client = new sdk.Client();

  // You can remove services you don't use
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
    .setKey(
      "b2e1a0b7c7c2c0bd5a876b67795c6d6bd40700afc742a580e878979b88daed2fde4d21ff24836fcaf7e09b51726be84b3e20cc20e5ae5a018088e0d27b23ebdb27fde66a7569a71b34f0274b26e10c0e7fa7762c24aeb6a54db4d848c5896a375179f5018e673f0125a9471b3071b00ad199ad76b01751faac357598c3130649"
    )
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
