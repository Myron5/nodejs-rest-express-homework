const cloudinaryConfig = Object.freeze({
  cloud_name: 'dsn4linai',
  api_key: '851972883569612',
  api_secret: 'OJoFXMAGfbk2DyMEEzvl-d2DOLE',
});

const imageConfig = Object.freeze({
  quality: 75,
  width: 250,
  height: 250,
  crop: 'fill',
  gravity: 'center',
});

module.exports = {
  imageConfig,
  cloudinaryConfig,
};
