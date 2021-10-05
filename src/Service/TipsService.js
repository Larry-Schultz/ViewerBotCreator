import axios from 'axios';

const url = 'https://fftbg.com/api/tips';

export class DefaultTips {

    descriptionLookup(element) {
        return 'blank';
    }

    descriptionType(element) {
        return 'none';
    }

    descriptionColor(element) {
        return 'black';
    }
}

export class Tips extends DefaultTips {
    tips;

    itemTips;
    abilityTips;
    userSkillTips;
    classTips;

    constructor(response) {
        super();
        this.tips = response.data

        this.itemTips = this.tips['Item'];
        this.abilityTips = this.tips['Ability'];
        this.userSkillTips = this.tips['UserSkill'];
        this.classTips = this.tips['Class'];
    }


    isTipType(type, element) {
        let isItem = false;
        try {
            isItem = type[element];
        } catch(error) {
            isItem = false;
        }

        return isItem;
    }

    descriptionLookup(element) {
        if(element.includes('-Item')) {
            const cleanedElement = element.replace('-Item', '');
            if(this.isTipType(this.itemTips, cleanedElement)) {
                return this.itemTips[cleanedElement];
            } else {
                return 'blank';
            }

        }

        if(this.isTipType(this.itemTips, element)) {
            return this.itemTips[element];
        } else if(this.isTipType(this.classTips , element)) {
            return this.classTips[element];
        } else if(this.isTipType(this.userSkillTips, element)) {
            return this.userSkillTips[element];
        } else if(this.isTipType(this.abilityTips, element)) {
            return this.abilityTips[element];
        } else {
            return 'blank';
        }
    }

    descriptionType(element) {
        if(element.includes('-Item')) {
            return "item";
        }

        if(this.isTipType(this.itemTips, element)) {
            return "item";
        } else if(this.isTipType(this.classTips, element)) {
            if(element.includes("Male") || element.includes("Female")) {
                return 'class';
            } else {
                return "monster";
            }
        } else if(this.isTipType(this.userSkillTips, element)) {
            return "userSkill";
        } else if(this.isTipType(this.abilityTips, element)) {
            return "ability";
        } else {
            return 'default';
        }
    }

    descriptionColor(element) {
        const type = this.descriptionType(element);
        switch(type) {
            case 'item':
                return 'blue';
            case 'ability':
                return 'red';
            case 'userSkill':
                return 'green';
            case 'class':
                return 'purple';
            case 'monster':
                return 'orange';
            default:
                return 'black';
        }
    }
}

export async function getTipData() {
    const response = await axios.get(url)
    const tips = new Tips(response);
    return tips;
}
