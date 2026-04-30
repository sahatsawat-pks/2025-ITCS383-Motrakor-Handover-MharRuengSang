const fs = require('fs');

const fixFile = (path) => {
  let content = fs.readFileSync(path, 'utf8');

  // Fix string assignment
  // _purchases = res['data'] ?? []
  content = content.replace(/_purchases = res\[\'data\'\] \?\? \[\];/g, '_purchases = res;');
  content = content.replace(/_cart = res\[\'data\'\] \?\? \[\];/g, '_cart = res;');

  fs.writeFileSync(path, content);
};

['Implementations/steamjek-mobile/lib/main.dart'].forEach(fixFile);
console.log('Fixed');
