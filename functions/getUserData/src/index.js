const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const apiKey = req.variables.SECRET_KEY;
  if (!apiKey) {
    throw new Error("Missing API key");
  }

  const client = new sdk.Client();
  const users = new sdk.Users(client);

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
  let userName;
  let imageURL;

  try {
    const userData = await users.get(userId);
    userName = userData.name;
    imageURL = userData.prefs?.imageURL;
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    userName,
    imageURL,
  });
};
