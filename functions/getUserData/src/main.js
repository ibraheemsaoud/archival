import { Client, Users } from 'node-appwrite';

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
      .setEndpoint("https://appwrite.archivals.eu/v1")
      .setProject("Archival")
      .setKey(apiKey)
      .setSelfSigned(true);

    const payload = JSON.parse(
      req.body.replace(/\n|\s{2,}/g, "").replace(/(\w+):/g, '"$1":')
    );
  
    if (!payload.userId) {
      error("Missing required userId parameter");
      return;
    }
    
    const { userId } = payload;
    let userName;
    let imageURL;

    try {
      const userData = await users.get(userId);
      userName = userData.name;
      imageURL = userData.prefs?.imageURL;
    } catch (err) {
      error(err);
      return;  
    }

    return res.json({
      userName,
      imageURL,
    });
  }

  return res.send("we shouldn't get there");
};

export default t;
