const cloudinary = require('cloudinary').v2;
const { cloudinaryConfig, imageConfig } = require('../constants');

cloudinary.config(cloudinaryConfig);

const loadToCloudinary = async (id, tmpUpload) => {
  try {
    const data = await cloudinary.uploader.upload(tmpUpload, { ...imageConfig, public_id: id });
    const avatarURL = data.url;
    return avatarURL;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = loadToCloudinary;
