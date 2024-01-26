import { Query } from 'appwrite';
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

    let fashionWeeks;

    try {
      fashionWeeks = await database.listDocuments(
        '649bf127bdd26e9850cd',
        '64d75694839749467fef',
        [Query.equal('isPublic', true)]
      );
    } catch (err) {
      error(err);
      return;
    }

    return res.json([
      {
        type: 'featured_fashion_week',
        entry: fashionWeeks.documents,
      },
    ]);
  }

  return res.send("we shouldn't get there");
};

export default t;
