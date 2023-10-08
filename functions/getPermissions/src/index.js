const sdk = require("node-appwrite");

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
  if (!payload.databaseId || !payload.collectionId) {
    throw new Error("Missing required parameters");
  }
  const userId = req.variables["APPWRITE_FUNCTION_USER_ID"];
  const { databaseId, collectionId, teamName, documentId } = payload;

  const checkPermission = (permission, type) => {
    return (
      permission === `${type}("users")` ||
      permission === `${type}("any")` ||
      permission === `${type}("user:${userId}")` ||
      (teamName && permission === `${type}("team:${teamName}")`)
    );
  };

  try {
    const permissions = [];
    const promise = await database.getCollection(databaseId, collectionId);
    permissions.push(...promise.$permissions);
    if (documentId) {
      const promise = await database.getDocument(
        databaseId,
        collectionId,
        documentId
      );
      const documentPermissions = promise.$permissions;
      permissions.push(...documentPermissions);
    }

    let read = false,
      create = false,
      update = false,
      delete_ = false;

    permissions.forEach((permission) => {
      read = checkPermission(permission, "read");
      create = checkPermission(permission, "create");
      update = checkPermission(permission, "update");
      delete_ = checkPermission(permission, "delete");
    });

    res.json({
      permissions: {
        read,
        create,
        update,
        delete: delete_,
      },
    });
  } catch (error) {
    console.error(error);
  }

  res.json({
    error: "an unexpected error occured",
  });
};
