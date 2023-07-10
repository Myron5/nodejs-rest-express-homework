const pug = require('pug');
const { convert } = require('html-to-text');
const path = require('path');

const getViewsHTML = (name, optiona) => {
  const pathToEmailPUG = path.join(__dirname, '../', 'views', name);

  const html = pug.renderFile(pathToEmailPUG, optiona);

  const text = convert(html);

  return { html, text };
};

module.exports = getViewsHTML;
