const fs = require('fs');

const fixFile = (path) => {
  let content = fs.readFileSync(path, 'utf8');

  // Fix API service signatures
  if (path.includes('api_service')) {
    const listEndpoints = ['getCart', 'getLibrary', 'getWishlist', 'getListings', 'getMyItems', 'getGameRatings', 'getRewards', 'getThreads', 'getThreadReplies'];
    listEndpoints.forEach(ep => {
      content = content.replace(`static Future<Map<String, dynamic>> ${ep}(`, `static Future<List<dynamic>> ${ep}(`);
      content = content.replace(`static Future<Map<String, dynamic>> ${ep}()`, `static Future<List<dynamic>> ${ep}()`);
    });
  }

  // Fix assignments res['data'] to res
  if (path.includes('screens.dart') || path.includes('main.dart')) {
    content = content.replace(/_wishlist = res\[\'data\'\] \?\? \[\];/g, '_wishlist = res;');
    content = content.replace(/_listings = res\[\'data\'\] \?\? \[\];/g, '_listings = res;');
    content = content.replace(/_purchases = res\[\'data\'\] \?\? \[\];/g, '_purchases = res;');
    content = content.replace(/_cart = res\[\'data\'\] \?\? \[\];/g, '_cart = res;');
    content = content.replace(/_threads = res\[\'data\'\] \?\? \[\];/g, '_threads = res;');
    content = content.replace(/_items = res\[\'data\'\] \?\? \[\];/g, '_items = res;');
  }

  fs.writeFileSync(path, content);
};

['Implementations/steamjek-mobile/lib/api_service.dart',
 'Implementations/steamjek-mobile/lib/screens.dart',
 'Implementations/steamjek-mobile/lib/main.dart'].forEach(fixFile);

console.log('Fixed');
