import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {

    constructor(
        @Inject('CITY_REPOSITORY')
        private readonly cityRepository: Repository<CityEntity>,
        
        private readonly cacheService: CacheService,
    ){}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {

        return this.cacheService.getCache<CityEntity[]>(
                `state_${stateId}`, 
                () => this.cityRepository.find({
                    where: {
                        stateId,
                    }
                })
            )

    }

    async findCityById(cityId: number): Promise<CityEntity>{

        const city = await this.cityRepository.findOne({
            where: {id: cityId}
        });

        if(!city){
            throw new NotFoundException('Não foi possivel encontrar essa cidade!')
        }

        return city;

    }

    async findCityByName(nameCity: string, nameState: string): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                name: nameCity,
                state: {
                    uf: nameState
                }
            },
            relations: {
                state: true,
            }
        });

        if(!city){
            throw new NotFoundException('Não foi possivel encontrar essa cidade!');
        }

        return city;
    }

}
