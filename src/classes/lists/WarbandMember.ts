import { IListModel, ListModel } from "./ListModel"
import { IListEquipment, ListEquipment } from "./ListEquipment"
import { IListItem, ListItem } from "../feature/list/ListItem"
import { IItemPartial } from "../feature/list/ListGroup"
import { ITextBlock, TextBlock } from "../DescriptionItem"
import { IFactionUpgrade, FactionUpgrade } from "../feature/factions/FactionUpgrade"

interface IWarbandMember {
    name: string,
    model: IListModel,
    equipment: IListEquipment[],
    elite: boolean,
    injuries: IListItem[],
    skills: IItemPartial[],
    experience: number,
    notes : string,
    upgrades : IFactionUpgrade[]
}

class WarbandMember {
    public Name;

    public Elite;
    public Model;

    public Equipment;
    public Injuries;
    public Skills;
    public Upgrades;

    public Experience;
    
    public Notes;

    public constructor(data: IWarbandMember) {
        this.Name = data.name;
        this.Elite = data.elite;
        this.Experience = data.experience;

        this.Model = this.ModelMaker(data.model);
        this.Equipment = this.EquipmentMaker(data.equipment);
        this.Injuries = this.InjuryMaker(data.injuries);
        this.Upgrades = this.UpgradeMaker(data.upgrades);
        this.Skills = data.skills;
        this.Notes = data.notes
    }

    private InjuryMaker(_data : IListItem[]) {
        const InjuryList : ListItem[] = [];
        let i = 0

        for (i = 0; i < _data.length ; i ++) {
            const injurytemp = new ListItem(_data[i])
            InjuryList.push(injurytemp)
        }

        return InjuryList;
    }

    private UpgradeMaker(_data : IFactionUpgrade[]) {
        const upgradelist : FactionUpgrade[] = [];
        let i = 0

        for (i = 0; i < _data.length ; i ++) {
            const upgradetemp = new FactionUpgrade(_data[i])
            upgradelist.push(upgradetemp)
        }

        return upgradelist;
    }

    public GetDucatCost() {
        let totalCost = 0;

        if (this.Model.CostType == "ducats") {
            totalCost += this.Model.Cost;
        }

        let i = 0;
        for (i = 0; i < this.Equipment.length; i++) {
            if (this.Equipment[i].CostType == "ducats") {
                totalCost += this.Equipment[i].Cost;
            }
        }
        for (i = 0; i < this.Upgrades.length; i++) {
            if (this.Upgrades[i].CostID == "ducats") {
                totalCost += this.Upgrades[i].Cost;
            }
        }

        return totalCost.toString()
    }

    public GetGloryCost() {
        let totalCost = 0;

        if (this.Model.CostType == "glory") {
            totalCost += this.Model.Cost;
        }

        let i = 0;
        for (i = 0; i < this.Equipment.length; i++) {
            if (this.Equipment[i].CostType == "glory") {
                totalCost += this.Equipment[i].Cost;
            }
        }
        for (i = 0; i < this.Upgrades.length; i++) {
            if (this.Upgrades[i].CostID == "glory") {
                totalCost += this.Upgrades[i].Cost;
            }
        }

        return totalCost.toString()
    }

    private ModelMaker(data : IListModel) {
        return new ListModel(data);
    }

    private TextMaker(data : ITextBlock[]) {
        const tempList: TextBlock[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new TextBlock(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
    }

    private EquipmentMaker(data : IListEquipment[]) {
        const tempList: ListEquipment[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new ListEquipment(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
    }


}

export {IWarbandMember, WarbandMember}