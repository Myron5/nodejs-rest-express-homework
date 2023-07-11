const cloudinary = require('cloudinary').v2;
const Jimp = require('jimp');
const fs = require('node:fs/promises');

const { cloudinaryConfig, imageConfig } = require('../constants');
cloudinary.config(cloudinaryConfig);

class Image {
  constructor(tmpUpload) {
    this.tmpUpload = tmpUpload;
  }

  async loadToCloudinary(id) {
    try {
      const data = await cloudinary.uploader.upload(this.tmpUpload, { ...imageConfig, public_id: id });
      const avatarURL = data.url;
      return avatarURL;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  jimpManipulations(image) {
    image.cover(250, 250).quality(75);
  }

  async moveImage(resultUpload) {
    const image = await Jimp.read(this.tmpUpload);
    this.jimpManipulations(image);
    await image.writeAsync(resultUpload);
    await fs.unlink(this.tmpUpload);
  }
}

module.exports = Image;
