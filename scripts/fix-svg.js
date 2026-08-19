const fs = require('fs');
const path = require('path');

const svgPkgPath = path.join(__dirname, '../node_modules/react-native-svg/package.json');
if (fs.existsSync(svgPkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(svgPkgPath, 'utf8'));
  if (pkg['react-native'] === 'src/index.ts') {
    pkg['react-native'] = 'lib/commonjs/index.js';
    fs.writeFileSync(svgPkgPath, JSON.stringify(pkg, null, 2));
    console.log('Successfully patched react-native-svg package.json for Metro stability!');
  }
}
