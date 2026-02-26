const ImageKit = require("@imagekit/nodejs");
require("dotenv").config()

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(fileBuffer, fileName) {
    try {
        const result = await imagekit.files.upload({ 
            file: fileBuffer.toString("base64"),
            fileName: fileName,
            folder: "/FoodClone"
        });

        return result;
    } catch (error) {
        console.error("Image Upload Error:", error);
        throw error;
    }
}

module.exports = { uploadFile };