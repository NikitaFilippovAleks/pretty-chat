const colors = require('./src/theme/colors.ts');

module.exports = {
  plugins: [
    require('postcss-simple-vars')({ variables: colors }),
    require('postcss-nested')
  ]
}
