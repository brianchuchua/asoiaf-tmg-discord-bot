// This script takes in cardNames, imageUrls, and the cardType as input and outputs a string in the format of cardData, to be used in the /asoiaf folder
// This just exists to speed up my development and is not used by the application.

// To execute: ts-node generateCardData.ts (in this directory -- don't forget to globally install ts-node first)

// Sample data can be seen at the bottom of the file

import fs from 'fs';

const cardType = process.env.cardType ?? 'TacticsCard';

const cardNames = [
  'Cunning Ploy',
  'Dune Tactics',
  'Rhoynish Vengeance',
  'Rising Temperatures',
  'Sand Diplomacy',
  'Superior Positioning',
  'Unbowed, Unbent, Unbroken',
  "Viper's Infamy",
  'Unexpected Exhaustion',
  'Intercept Orders',
];

const imageUrls = [
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-t1.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-t2.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-t3.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-t4.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-t5.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-t6.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-t7.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-oberyn-martell-pod-t1.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-oberyn-martell-pod-t2.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hm-oberyn-martell-pod-t3.png',
];

const generateCardData = () => {
  let cardData = "import { CardData, CardTypes } from '../types';\n\nconst cardData: CardData = {\n";
  cardNames.forEach((cardName, index) => {
    cardData += `"${cardName}": {
      name: "${cardName}",
      type: CardTypes.${cardType},
      imageUrl: '${imageUrls[index]}',
      imageUrlBack: '${cardType === 'TacticsCard' ? '' : imageUrls[index].replace('.png', '-back.png').replace('.jpg', '-back.jpg')}',
    },
    `;
  });
  return `${cardData}\n}\n\nexport default cardData;`;
};

const cardData = generateCardData();

fs.writeFileSync('./generatedCardData.ts', cardData);

/* Sample data:

const cardType = 'NonCombatUnit';

I generally get card names from https://asoiafcc.com/house-stark/, even though it's out of date -- I add missing cards, and fix typos, and replace their dashes.

I can also extract them from Faction Pack Content Lists like https://cmon-files.s3.amazonaws.com/pdf/assets_item/resource/312/Free_Folk_Faction_Pack_2021_Contents_List.pdf

const cardNames = [
  'Arya Stark - The Wolf Girl',
  'Catelyn Stark - Lady of Winterfell',
  'Eddard Stark - Hand of the King',
  'Eddard Stark - Warden of the North',
  'Howland Reed - Lord of the Crannogs',
  'Lyanna Mormont - Youngest She-Bear',
  'Robb Stark - King in the North',
  'Rodrik Cassel - Combat Veteran',
  'Sansa Stark - Little Bird',
];

I extract the imageUrls on this page ("https://www.asoiafbuilder.com/browse") using the script below in Chrome Dev Tools.

const imageUrls = [
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-arya-stark-twg.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-catelyn-stark-low.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-eddard-stark-hotk.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-eddard-stark-wotn.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-howland-reed-potn.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-lyanna-mormont-ysb.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-robb-stark-kitn.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-rodrik-cassel-cv.png',
  'https://onthetablegaming.com/asoiaf-builder-images/asoiafbuilder2021/hs-sansa-stark-lb.png',
];


  var elements = document.getElementsByClassName('card-image');

  var s = '';

  for (element in elements) {
      s += '"' + elements[element].src + '",';
  }

  console.log(s);

Unless they are tactics cards -- then I use:

  var elements = document.getElementsByClassName('filtered-spoiler')[0].getElementsByTagName('img');

  var s = '';

  for (element in elements) {
      s += '"' + elements[element].src + '",';
  }

  console.log(s);
*/
