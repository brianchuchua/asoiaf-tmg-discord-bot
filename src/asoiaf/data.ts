import Baratheons from './baratheons';
import Freefolk from './freefolk';
import Greyjoys from './greyjoys';
import Lannisters from './lannisters';
import Martells from './martells';
import Neutral from './neutral';
import NightsWatch from './nightswatch';
import Starks from './starks';
import Targaryens from './targaryens';
import { CardData } from './types';

// Some cards have the same name but for different factions. Ex. Counterplot. If found, rename them to unique names.
const checkForDuplicates = () => {
  const keys = Object.keys(Baratheons).concat(
    Object.keys(Freefolk),
    Object.keys(Lannisters),
    Object.keys(NightsWatch),
    Object.keys(Starks),
    Object.keys(Neutral),
    Object.keys(Targaryens),
    Object.keys(Greyjoys),
    Object.keys(Martells)
  );
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
  if (duplicates.length > 0) {
    console.log(`WARNING: Please rename these duplicate cards to disambiguate them: ${duplicates.join(', ')}`);
  }
};
checkForDuplicates();

const cardData: CardData = {
  ...Starks,
  ...Lannisters,
  ...Freefolk,
  ...Baratheons,
  ...NightsWatch,
  ...Neutral,
  ...Targaryens,
  ...Greyjoys,
  ...Martells,
};

export default cardData;
