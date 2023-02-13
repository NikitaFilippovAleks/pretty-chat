const colors = require('./src/theme/colors.js');

module.exports = {
  plugins: [
    require('postcss-simple-vars')({ variables: colors }),
    require('postcss-nested')
  ]
}
