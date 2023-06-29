const Jimp = require('jimp');
const fs = require('node:fs/promises');

const moveImage = async (tmpUpload, resultUpload) => {
  const image = await Jimp.read(tmpUpload);
  image.contain(250, 250).quality(75);
  await image.writeAsync(resultUpload);
  await fs.unlink(tmpUpload);
};

module.exports = moveImage;
