require('dotenv').config();

const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT
});

async function uploadImage(buffer) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: `post_${Date.now()}.jpg`
  });

  return result;
}

module.exports = uploadImage;
