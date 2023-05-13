/* eslint-disable @typescript-eslint/no-var-requires */
const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');
/* eslint-enable @typescript-eslint/no-var-requires */

const { window } = new JSDOM('<div id="root"></div>', {
  url: 'http://localhost:3000'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.FormData = window.FormData;

require.extensions['.hbs'] = (module, filename) => {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile(contents);
};

require.extensions['.pcss'] = (module) => {
  module.exports = {};
};

require.extensions['.svg'] = (module) => {
  module.exports = {};
};
