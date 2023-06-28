const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dsn4linai',
  api_key: '851972883569612',
  api_secret: 'OJoFXMAGfbk2DyMEEzvl-d2DOLE',
});

const loadToCloudinary = async (id, tmpUpload) => {
  try {
    const data = await cloudinary.uploader.upload(tmpUpload, {
      quality: 75,
      width: 250,
      height: 250,
      crop: 'fill',
      gravity: 'center',
      public_id: id,
    });
    const avatarURL = data.url;
    return avatarURL;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = loadToCloudinary;
