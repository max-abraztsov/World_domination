import {FC, useEffect} from 'react';
import Checkbox from '../UI/checkbox/Checkbox';
import { useAppSelector, useAppDispatch } from '../../hook';
import { toggleProtect, toggleCityDevelop } from '../../store/countrySlice';
import { ICity, IStatus } from '../../types/types';
import cl from "./City.module.css"

interface CityProps{
   city: ICity;
   isPresident: IStatus; 
   id: number;
   budget: number;
}

const City: FC<CityProps> = ({city, isPresident, id, budget}) => {
    
    const dispatch = useAppDispatch();
    const form = useAppSelector(state => state.form);


    if (city.state){
        return (
            <div className={cl.city}>
                <div className={cl.city__block}>
                    <img className={cl.city__photo} src={city.photo} alt={city.city_name +  " city"} />
                    <h2 className={cl.city__name}>{city.city_name}</h2>
                </div>
                <div className={cl.city__stats}>
                    <p className={cl.city__stat}><span>Progress</span><span>{city.progress}%</span></p><hr />
                    <p className={cl.city__stat}><span>Live level</span><span>{city.live_level}%</span></p><hr />
                    <p className={cl.city__stat}><span>Profit</span><span>{city.profit}$</span></p><hr />
                    <p className={cl.city__stat}><span>Shield</span>
                    { city.shield ? ( 
                        <img src="https://cdn-icons-png.flaticon.com/512/18/18442.png" alt="tick" />
                    ) : (
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/800px-Cross_red_circle.svg.png" alt="cross" />
                    )}</p>
                    
                    <hr />
                </div>
                <div>
                    { isPresident.isPresident ? ( // For president and admin
                        <div className={cl.city__prices}>
                            <Checkbox 
                                formState={form.cities[id].develop}
                                price={150}
                                budget={budget}
                                toggleStatus={() => dispatch(toggleCityDevelop({status:form.cities[id].develop, id: id, price: 150}))}
                            >Develop the city (150$)</Checkbox>
                            <Checkbox 
                                formState={form.cities[id].shield}
                                price={300}
                                budget={budget}
                                toggleStatus={() => dispatch(toggleProtect({ status: form.cities[id].shield, id: id, price: 300}))}
                                checked={city.shield}
                            >Protect (300$)</Checkbox>
                        </div>
                    ) : ( // For simple users
                        <div className={cl.city__prices}>
                            <p className={cl.city__price}>Develop the city (150$)</p>
                            <p className={cl.city__price}>Protect (300$)</p>
                        </div>
                    )}
                </div>
            </div>
            
        );
    } else {
        return (
            <div className={cl.city_desroyed}>
                <div className={cl.city__block_desroyed}>
                    <img className={cl.city__photo} src={city.photo} alt={city.city_name +  " city"} />
                    <h2 className={cl.city__name}>{city.city_name}</h2>
                </div>
                <div className={cl.city__stats}>
                    <p className={cl.city__stat}><span>Progress</span><span> - </span></p><hr />
                    <p className={cl.city__stat}><span>Live level</span><span> - </span></p><hr />
                    <p className={cl.city__stat}><span>Profit</span><span> - </span></p><hr />
                </div>
                <div className={cl.city__state_block}>
                    <p className={cl.city__state}>Destroyed</p>
                </div>
            </div>
            
        );
    }
};

export default City;