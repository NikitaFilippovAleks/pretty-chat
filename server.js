/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./distWebpack/'));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'distWebpack', 'index.html'));
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`App listening on port ${PORT}!`);
  /* eslint-enable no-console */
});
