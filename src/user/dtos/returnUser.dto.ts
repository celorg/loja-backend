import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { ReturnAddressDto } from "../../address/dtos/returnAddress.dto";

@Entity({name: 'user'})
export class ReturnUserDto {

    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    addresses?: ReturnAddressDto[];

    constructor(userEntity: UserEntity){
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.cpf = userEntity.cpf;
        this.addresses = userEntity.addresses 
            ? userEntity.addresses.map((address) => new ReturnAddressDto(address)) 
            : undefined;
    }

}