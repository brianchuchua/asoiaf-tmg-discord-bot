import Attachments from './attachments';
import CombatUnits from './combatUnits';
import InformationCards from './informationCards';
import NonCombatUnits from './nonCombatUnits';
import OpponentAttachments from './opponentAttachments';
import TacticsCards from './tacticsCards';

export default { ...CombatUnits, ...Attachments, ...NonCombatUnits, ...OpponentAttachments, ...TacticsCards, ...InformationCards };
