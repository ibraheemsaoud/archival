const sdk = require("node-appwrite");

/*
example for the era collection
{
databaseId: "649bf127bdd26e9850cd",
collectionId: "649c10682f8446d89bb3",
eraId: "jacquemus-le-chouchou-fall-winter-2023",
documentId: "649c44280eef587be97b",
}
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  // const account = new sdk.Account(client);
  // const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  // const functions = new sdk.Functions(client);
  // const health = new sdk.Health(client);
  // const locale = new sdk.Locale(client);
  // const storage = new sdk.Storage(client);
  // const teams = new sdk.Teams(client);
  // const users = new sdk.Users(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("Archival")
    .setKey(
      "b2e1a0b7c7c2c0bd5a876b67795c6d6bd40700afc742a580e878979b88daed2fde4d21ff24836fcaf7e09b51726be84b3e20cc20e5ae5a018088e0d27b23ebdb27fde66a7569a71b34f0274b26e10c0e7fa7762c24aeb6a54db4d848c5896a375179f5018e673f0125a9471b3071b00ad199ad76b01751faac357598c3130649"
    )
    .setSelfSigned(true);

  // interface Payload {
  //   databaseId: string;
  //   collectionId: string;
  //   documentId: string;
  //   eraId: string;
  // }

  const payload = JSON.parse(
    req.payload.replace(/\n|\s{2,}/g, "").replace(/(\w+):/g, '"$1":')
  );
  if (!payload.databaseId || !payload.collectionId || !payload.eraId) {
    throw new Error("Missing required parameters");
  }
  const userId = req.variables["APPWRITE_FUNCTION_USER_ID"];
  const { databaseId, collectionId, eraId } = payload;

  try {
    const promise = await database.getCollection(databaseId, collectionId);
    const permissions = promise.$permissions;
    let read = false,
      create = false,
      update = false,
      delete_ = false;
    const teamName = eraId.slice(0, 36);

    const checkPermission = (permission, type) => {
      console.log(permission, type, userId, teamName)
      if (
        permission === `${type}("users")` ||
        permission === `${type}("any")`
      ) {
        return true;
      }
      if (permission === `${type}("user:${userId}")`) {
        return true;
      }
      if (permission === `${type}("team:${teamName}")`) {
        return true;
      }
      return false;
    };
    permissions.forEach((permission) => {
      if (checkPermission(permission, "read")) {
        read = true;
      } else if (checkPermission(permission, "create")) {
        create = true;
      } else if (checkPermission(permission, "update")) {
        update = true;
      } else if (checkPermission(permission, "delete")) {
        delete_ = true;
      }
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
    console.log(error);
  }

  res.json({
    error: "an unexpected error occured",
  });
};
