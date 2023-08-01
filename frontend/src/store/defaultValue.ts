import { IForm, ICountry } from "../types/types"

export const generateDefaultForm = (object: ICountry): IForm => {
    return {
        round: object.round ,
        country: object.country ,
        nuclear_technology: object.nuclear_technology,
        ecology: false,
        budget: object.budget,
        rockets: object.rockets,
        rocket_order: 0,
        cities: [
            {
                city_name: object.cities[0].city_name,
                develop: false,
                shield: object.cities[0].shield,
            },
            {
                city_name: object.cities[1].city_name,
                develop: false,
                shield: object.cities[1].shield,
            },
            {
                city_name: object.cities[2].city_name,
                develop: false,
                shield: object.cities[2].shield,
            },
            {
                city_name: object.cities[3].city_name,
                develop: false,
                shield: object.cities[3].shield,
            },
        ],
        enemies: [
            {
                country: object.enemies[0].country,
                sanctions: object.enemies[0].sanctions,
                sanctions_from: object.enemies[0].sanctions_from,
                cities: [
                    {
                        city_name: object.enemies[0].cities[0].city_name,
                        is_attacked: false,
                        state: object.enemies[0].cities[0].state, 
                    },
                    {
                        city_name: object.enemies[0].cities[1].city_name,
                        is_attacked: false,
                        state: object.enemies[0].cities[1].state,
                    },
                    {
                        city_name: object.enemies[0].cities[2].city_name,
                        is_attacked: false,
                        state: object.enemies[0].cities[2].state, 
                    },
                    {
                        city_name: object.enemies[0].cities[3].city_name,
                        is_attacked: false,
                        state: object.enemies[0].cities[3].state, 
                    },
                ],
            },
            {
                country: object.enemies[1].country,
                sanctions: object.enemies[1].sanctions,
                sanctions_from: object.enemies[1].sanctions_from,
                cities: [
                    {
                        city_name: object.enemies[1].cities[0].city_name,
                        is_attacked: false,
                        state: object.enemies[1].cities[0].state, 
                    },
                    {
                        city_name: object.enemies[1].cities[1].city_name,
                        is_attacked: false,
                        state: object.enemies[1].cities[1].state,
                    },
                    {
                        city_name: object.enemies[1].cities[2].city_name,
                        is_attacked: false,
                        state: object.enemies[1].cities[2].state, 
                    },
                    {
                        city_name: object.enemies[1].cities[3].city_name,
                        is_attacked: false,
                        state: object.enemies[1].cities[3].state, 
                    },
                ],
            },
            {
                country: object.enemies[2].country,
                sanctions: object.enemies[2].sanctions,
                sanctions_from: object.enemies[2].sanctions_from,
                cities: [
                    {
                        city_name: object.enemies[2].cities[0].city_name,
                        is_attacked: false,
                        state: object.enemies[2].cities[0].state, 
                    },
                    {
                        city_name: object.enemies[2].cities[1].city_name,
                        is_attacked: false,
                        state: object.enemies[2].cities[1].state,
                    },
                    {
                        city_name: object.enemies[2].cities[2].city_name,
                        is_attacked: false,
                        state: object.enemies[2].cities[2].state, 
                    },
                    {
                        city_name: object.enemies[2].cities[3].city_name,
                        is_attacked: false,
                        state: object.enemies[2].cities[3].state, 
                    },
                ],
            },
        ],
        donate: {
            from: "",
            to: "",
            amount: 0,
        },
    }
}