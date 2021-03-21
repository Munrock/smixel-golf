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
        let chosenAttribute = {
            attribute: 'none',
            dice: [4],
        }
        attributes.forEach(attribute => {
            let dice = [];
            dice = dice.concat(this.findAttributeDice(attribute));
            dice = dice.concat(this.findCardDice(attribute));
            if (SkillCheck.dPower(dice) >= SkillCheck.dPower(chosenAttribute.dice))
                chosenAttribute = { attribute, dice }
        });
        const roll = SkillCheck.roll(chosenAttribute.dice);
        const result = (roll >= target);
        return { ...chosenAttribute, roll, result };
    }

    /**
     * search toon for a matching attribute
     * return an array of dice indexes
     * attr String attribute to match
     */
    findAttributeDice(attr) {
        //TODO
        return [4];
    }

    /**
     * search toon deck for matching tags
     * attr String attribute to match
     */
    findCardDice(attr) {
        //TODO loop through each card in hand, add the bonus for any match
        //process the card according to its instructions
        return [];
    }

}

module.exports = SkillCheck;
