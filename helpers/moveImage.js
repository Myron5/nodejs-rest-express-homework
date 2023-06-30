const Jimp = require('jimp');
const fs = require('node:fs/promises');

const { jimpManipulations } = require('../constants');

const moveImage = async (tmpUpload, resultUpload) => {
  const image = await Jimp.read(tmpUpload);
  jimpManipulations(image);
  await image.writeAsync(resultUpload);
  await fs.unlink(tmpUpload);
};

module.exports = moveImage;
