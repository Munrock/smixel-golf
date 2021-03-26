class SkillCheck {
    constructor(toon) {
        this.toon = toon;
    }

    static diceValues = [4, 6, 8, 10, 12, 20];

    static dPower = dice => dice.flat().map(die => die.die).reduce((accumulator, currentValue) => accumulator + currentValue + 1);

    static explainDice = dice => dice.map(die => `${die.die.map(die => `d${die}`).join(', ')} from ${die.source} (slot: ${die.slot})`).join(',\r\n') + '.';

    static roll = dice => {
        const rolls = dice.flat().map(die => Math.floor(Math.random() * die.die) + 1);
        return rolls.reduce((accumulator, currentValue) => accumulator + currentValue);
    };

    test(attributes, target) {
        let selectedDice = [{ die: 4, source: 'no attribute' }];
        attributes.forEach(attribute => {
            const dice = this.findAttributeDice(attribute)
                .concat(this.findCardDice(attribute));
            if (SkillCheck.dPower(dice) >= SkillCheck.dPower(chosenAttribute.dice))
                selectedDice = dice;
        });
        const roll = SkillCheck.roll(chosenAttribute.dice);
        const result = (roll >= target);
        return { target, dice, roll, result };
    }

    /**
     * search toon for a matching attribute
     * return an array of die objects
     * attr String attribute to match
     */
    findAttributeDice(attr) {
        const categories = ['physical', 'mental', 'social', 'extra'];
        let dice = [{ die: 4, source: 'no attribute' }];
        categories.forEach(cat => {
            if (attr in this.toon.data.stats.current[cat])
                dice = [{ die: this.toon.data.stats.current[cat][attr], source: `${attr} attribute`, slot: 'innate' }];
        });
        return dice;
    }

    /**
     * search toon hand for matching tags
     * return array of die objects
     * attr String attribute to match
     */
    findCardDice(attr) {
        const handIndexes = Array.from(this.toon.library.hand.keys());
        let dice = [];
        let usedSlots = [];
        handIndexes.forEach(index => {
            const card = this.toon.library.hand.get(index);
            const cardHasAttribute = card.tags.includes(attr);
            const usableSlots = card.slot.filter(slot => !usedSlots.includes(slot).length);
            if (cardHasAttribute && usableSlots > 0) {
                dice.push({ die: card.bonus, source: `${card.name} card`, slot: usableSlots[0] });
                usedSlots.push(usableSlots[0]);
                this.toon.library.use(index);
            }
        });
        return dice;
    }

}

module.exports = SkillCheck;

