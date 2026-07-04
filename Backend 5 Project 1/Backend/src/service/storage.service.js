const ImageKit = require('@imagekit/nodejs');

const imageKitInstance = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT,
});

async function uploadfile(buffer) {
    console.log(buffer);

    const result = await imageKitInstance.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg",
    });

    return result;
}

module.exports = uploadfile;