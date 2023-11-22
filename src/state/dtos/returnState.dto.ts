import { CityEntity } from "src/city/entities/city.entity";
import { StateEntity } from "../entities/state.entity";

export class ReturnStateDto {

    name: string;

    constructor(state: StateEntity){
        this.name = state.name;
    }

}