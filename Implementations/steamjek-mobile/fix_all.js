const fs = require('fs');

function fixApiService() {
  let content = fs.readFileSync('lib/api_service.dart', 'utf8');
  content = content.replace('static Future<List<dynamic>> getPoints()', 'static Future<Map<String, dynamic>> getPoints()');
  fs.writeFileSync('lib/api_service.dart', content);
  console.log('api_service.dart fixed');
}

function fixMainDart() {
  let content = fs.readFileSync('lib/main.dart', 'utf8');
  content = content.replace(/_purchases = res\['data'\] \?\? \[\];/g, '_purchases = res;');
  content = content.replace(/_purchases = res;/g, '_purchases = res;'); // In case it's already res
  content = content.replace(/_cart = res\['data'\] \?\? \[\];/g, '_cart = res;');
  content = content.replace(/_cart = res;/g, '_cart = res;');

  // Wait, let's just do a clean replace using regex matching lines
  content = content.replace(/setState\(\(\) => _purchases = res\['data'\] \?\? \[\]\);/g, 'setState(() => _purchases = res);');
  content = content.replace(/setState\(\(\) => _cart = res\['data'\] \?\? \[\]\);/g, 'setState(() => _cart = res);');
  
  fs.writeFileSync('lib/main.dart', content);
  console.log('main.dart fixed');
}

function fixScreensDart() {
  let content = fs.readFileSync('lib/screens.dart', 'utf8');
  
  content = content.replace(/_wishlist = res\['data'\] \?\? \[\];/g, '_wishlist = res;');
  content = content.replace(/_listings = res\['data'\] \?\? \[\];/g, '_listings = res;');
  
  // screens.dart points and rewards
  content = content.replace(/rewards = rRes\['rewards'\] \?\? \[\];/g, 'rewards = rRes;');
  
  // community threads
  content = content.replace(/_threads = res\['data'\] \?\? \[\];/g, '_threads = res;');
  
  fs.writeFileSync('lib/screens.dart', content);
  console.log('screens.dart fixed');
}

fixApiService();
fixMainDart();
fixScreensDart();
