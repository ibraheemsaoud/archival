import { Client, Users } from 'node-appwrite';
import { Query, ID } from "appwrite";

const t = async ({ req, res, log, error }) => {
  if (req.method === 'POST') {
    const apiKey = process.env.SECRET_KEY;
    if (!apiKey) {
      error("Missing API key");
      return;
    }
  
    const client = new Client();
    const users = new Users(client);
    
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("Archival")
      .setKey(apiKey)
      .setSelfSigned(true);
  
    const payload = JSON.parse(
      req.body.replace(/\n|\s{2,}/g, "").replace(/(\w+):/g, '"$1":')
    );

    if (!payload.email || !payload.password || !payload.name) {
      error("Missing required parameters");
      return;
    }

    const { email, password, name } = payload;

    try {
      // check if the user is already registered
      const userByName = await users.list([Query.equal("name", name)]);
      if (userByName.total > 0) {
        error("user already exists")
        return res.json({ error: "user already exists" });
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
  
        return res.json(updatedUser);
      } else {
        error("user not created");
        return;
      }
    } catch (err) {
      if (err.includes?.("A user with the same email already exists in your project")) {
        return res.json({
          error: "user already exists",
        });
      }
      if (err.response?.message) {
        return res.json({
          error: err.response?.message,
        });
      }
      error(err)
      return;
    }
  }

  return res.send("we shouldn't get there");
};

export default t;
