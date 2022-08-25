// This script takes a list of URLs, the prefix to ignore, and converts them roughly to the name of the card.
// This saves me a lot of manual typing and I can just clean it up.

import fs from 'fs';

const PREFIX_TO_IGNORE = 'hm-';

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

const convertUrlsToNames = () => {
  const convertedNames = imageUrls
    .map((url) => {
      const name = url.replace(/^.*\//, '');
      const nameWithoutPrefix = name.replace(PREFIX_TO_IGNORE, '');
      const nameWithoutHyphens = nameWithoutPrefix.replace(/-/g, ' ');
      const nameWithSpacesCapitalized = nameWithoutHyphens.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
      const nameWithoutExtension = nameWithSpacesCapitalized.replace(/\.png$/, '');
      return `"${nameWithoutExtension}",`;
    })
    .join('\n');
  return `const cardNames = [${convertedNames}];`;
};

const names = convertUrlsToNames();

fs.writeFileSync('./generatedCardNames.ts', names);

/* Sample data:

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
*/
