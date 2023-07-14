const getBaseURL = req => `${req.protocol}://${req.get('host')}`;

module.exports = getBaseURL;
