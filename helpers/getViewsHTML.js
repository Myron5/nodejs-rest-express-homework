const pug = require('pug');
const { convert } = require('html-to-text');
const path = require('path');

const getViewsHTML = (name, options) => {
  const pathToEmailPUG = path.join(__dirname, '../', 'views', name);

  const html = pug.renderFile(pathToEmailPUG, options);

  const text = convert(html);

  return { html, text };
};

module.exports = getViewsHTML;
