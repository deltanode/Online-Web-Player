const fs = require('fs');
const path = require('path');

const npmrcPath = path.join(process.env.HOME || process.env.USERPROFILE, '.npmrc');
fs.writeFileSync(npmrcPath, `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`);
