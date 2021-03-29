class SkillCheck {
    constructor(toon) {
        this.toon = toon;
    }

    static diceValues = [4, 6, 8, 10, 12, 20];

    static dPower = dice => dice.map(die => die.die).flat().reduce((accumulator, currentValue) => accumulator + currentValue + 1);

    static explainDice = dice => dice.map(die => `${die.die.map(die => `d${die}`).join(', ')} from ${die.source} (slot: ${die.slot})`).join(',\r\n') + '.';

    static roll = dice => {
        const rolls = dice.map(die => die.die.map(d => Math.floor(Math.random() * d) + 1)).flat();
        return rolls.reduce((accumulator, currentValue) => accumulator + currentValue);
    };

    test(attributes, target) {
        let dice = this.findAttributeDice(attributes).concat(this.findCardDice(attributes));
        const roll = SkillCheck.roll(dice);
        const result = (roll >= target);
        return { target, dice, roll, result };
    }

    /**
     * search toon for a matching attribute
     * return an array of die objects
     * attr String attribute to match
     */
    findAttributeDice(attrs) {
        const filteredAttributes = attrs.filter(attr => ['physical/agility', 'physical/fortitude', 'physical/might', 'mental/learning', 'mental/logic', 'mental/perception', 'mental/will', 'social/deception', 'social/persuasion', 'social/presence', 'extra/alteration', 'extra/creation', 'extra/energy', 'extra/entropy', 'extra/influence', 'extra/movement', 'extra/prescience', 'extra/protection'].includes(attr));
        let dice = [{ die: [4], source: 'no attribute', slot: 'innate' }];
        filteredAttributes.forEach(attr => {
            const attrStrings = attr.split('/');
            const attributeDicePowers = this.toon.data.stats.current[attrStrings[0]][attrStrings[1]];
            const candidateDice = [{die:[SkillCheck.diceValues[attributeDicePowers]], source:attrStrings[1], slot: 'innate'}];
            if(SkillCheck.dPower(candidateDice)>=SkillCheck.dPower(dice)) dice = candidateDice;
        });
        return dice;
    }

    /**
     * search toon hand for matching tags
     * return array of die objects
     * attr String attribute to match
     */
    findCardDice(attrs) {
        const handIndexes = Array.from(this.toon.library.hand.keys());
        let dice = [];
        let usedSlots = [];
        handIndexes.forEach(index => {
            const card = this.toon.library.hand.get(index);
            const cardHasAttribute = attrs.some(attr => card.tags.includes(attr));
            const usableSlots = card.slot.filter(slot => !usedSlots.includes(slot).length);
            if (cardHasAttribute && (usableSlots > 0)) {
                console.log(`${card.name} was used`);
                dice.push({ die: card.bonus.map(die=>SkillCheck.diceValues[die]), source: `${card.name} card`, slot: usableSlots[0] });
                usedSlots.push(usableSlots[0]);
                this.toon.library.use(index);
            }
        });
        return dice;
    }

}

module.exports = SkillCheck;

