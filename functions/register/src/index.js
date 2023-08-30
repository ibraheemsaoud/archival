const { Query, ID } = require("appwrite");
const sdk = require("node-appwrite");

/*
example for the era collection
{
  email: "saoudibraheem@gmail.com",
  password: "12345678",
  name: "crostal"
}
*/

module.exports = async function (req, res) {
  const apiKey = req.variables.SECRET_KEY;
  if (!apiKey) {
    throw new Error("Missing API key");
  }

  const client = new sdk.Client();

  const users = new sdk.Users(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("Archival")
    .setKey(apiKey)
    .setSelfSigned(true);

  // interface Payload {
  //   email: string;
  //   password: string;
  //   name: string;
  // }

  const payload = JSON.parse(
    req.payload.replace(/\n|\s{2,}/g, "").replace(/(\w+):/g, '"$1":')
  );
  if (!payload.email || !payload.password || !payload.name) {
    throw new Error("Missing required parameters");
  }
  const { email, password, name } = payload;

  try {
    // check if the user is already registered
    const userByName = await users.list([Query.equal("name", name)]);
    if (userByName.total > 0) {
      res.json({
        error: "user already exists",
      });
    }

    const createdUser = await users.create(
      ID.unique(),
      email,
      undefined,
      password,
      name
    );

    if (createdUser.$id) {
      const updatedUser = await users.updatePrefs(createdUser.$id, {
        displayName: name,
        imageURL: undefined,
      });

      res.json(updatedUser);
    } else {
      throw new Error("user not created");
    }

    res.json({});
  } catch (error) {
    if (
      error.includes(
        "A user with the same email already exists in your project"
      )
    ) {
      res.json({
        error: "user already exists",
      });
    }
    throw new Error(error);
  }

  res.json({
    error: "an unexpected error occured",
  });
};
