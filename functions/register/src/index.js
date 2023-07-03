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
  const client = new sdk.Client();

  const users = new sdk.Users(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("Archival")
    .setKey(
      "b2e1a0b7c7c2c0bd5a876b67795c6d6bd40700afc742a580e878979b88daed2fde4d21ff24836fcaf7e09b51726be84b3e20cc20e5ae5a018088e0d27b23ebdb27fde66a7569a71b34f0274b26e10c0e7fa7762c24aeb6a54db4d848c5896a375179f5018e673f0125a9471b3071b00ad199ad76b01751faac357598c3130649"
    )
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
        imageURL: undefined
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
