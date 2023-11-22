import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {

    constructor(
        @Inject('STATE_REPOSITORY')
        private readonly stateRepository: Repository<StateEntity>
    ){}

    async getAllState(): Promise<StateEntity[]> {
        return this.stateRepository.find();
    }

}
