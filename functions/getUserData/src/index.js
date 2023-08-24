const sdk = require("node-appwrite");

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

  const payload = JSON.parse(
    req.payload.replace(/\n|\s{2,}/g, "").replace(/(\w+):/g, '"$1":')
  );

  if (!payload.userId) {
    throw new Error("Missing required userId parameter");
  }

  const { userId } = payload;
  const promise = users.get(userId);

  promise.then(
    function (response) {
      console.log(response);
      res.json({
        name: response.user.name,
        imageURL: response.user.prefs?.imageURL,
      });
    },
    function (error) {
      console.error(error);
    }
  );
};
