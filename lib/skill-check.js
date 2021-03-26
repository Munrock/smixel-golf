class SkillCheck {
    constructor(toon) {
        this.toon = toon;
    }

    static diceValues = [4, 6, 8, 10, 12, 20];

    static dPower = dice => dice.reduce((accumulator, currentValue) => accumulator + currentValue + 1);

    static roll = dice => {
        const rolls = dice.map(die => Math.floor(Math.random() * die) + 1);
        return rolls.reduce((accumulator, currentValue) => accumulator + currentValue);
    };

    test(attributes, target) {
        let dice = [];
        attributes.forEach(attribute => {
            dice = dice.concat(this.findAttributeDice(attribute));
            dice = dice.concat(this.findCardDice(attribute));
            if (SkillCheck.dPower(dice) >= SkillCheck.dPower(chosenAttribute.dice))
                chosenAttribute = { attribute, dice }
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
        let dice = [{die:4,source:'Default'}];
        categories.forEach(cat => {
            if(attr in this.toon.data.stats.current[cat])
            dice = [{die: this.toon.data.stats.current[cat][attr], source:'Base Attribute'}];
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
        handIndexes.forEach(index=>{
            const card = this.toon.library.hand.get(index);
            if(card.tags.includes(attr)){
                dice.push({die: card.bonus, source: `From ${card.name}`});
                this.toon.library.use(index);
            }
        });
        return dice;
    }

}

module.exports = SkillCheck;

