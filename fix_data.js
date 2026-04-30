const fs = require('fs');

let content = fs.readFileSync('Implementations/steamjek-mobile/lib/api_service.dart', 'utf8');

// Fix addToCart
content = content.replace(/'gameId': gameId/g, "'game_id': gameId");

// Fix listMarketItem
content = content.replace(/'itemTypeId': itemTypeId/g, "'item_type_id': itemTypeId");

// Fix rateGame
content = content.replace(/'reviewText': reviewText/g, "'review': reviewText");

fs.writeFileSync('Implementations/steamjek-mobile/lib/api_service.dart', content);
console.log('Fixed api_service.dart payloads');
