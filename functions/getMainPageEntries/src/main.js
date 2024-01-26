import { Client, Databases } from 'node-appwrite';

const t = async ({ req, res, log, error }) => {
  if (req.method === 'POST') {
    const apiKey = process.env.SECRET_KEY;
    if (!apiKey) {
      error('Missing API key');
      return;
    }

    const client = new Client();
    const database = new Databases(client);

    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('Archival')
      .setKey(apiKey)
      .setSelfSigned(true);

    let featuredFashionWeeks;

    try {
      featuredFashionWeeks = await database.getDocument(
        '649bf127bdd26e9850cd',
        '64d75694839749467fef',
        '6545df80a9bc304be8e1',
      );
    } catch (err) {
      error(err);
      return;
    }

    let fashionWeeks

    try {
      fashionWeeks = await database.getDocument(
        '649bf127bdd26e9850cd',
        '64d75694839749467fef',
        '65b3b7ad30d10d9c36d7',
      );
    } catch (err) {
      error(err);
      return;
    }

    return res.json([
      {
        type: 'featured_fashion_week',
        entry: featuredFashionWeeks,
      },
      {
        type: 'current_fashion_week',
        entry: fashionWeeks,
      }
    ]);
  }

  return res.send("we shouldn't get there");
};

export default t;
