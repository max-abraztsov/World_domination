import {FC, useEffect} from 'react';
import Checkbox from '../UI/checkbox/Checkbox';
import { useAppSelector, useAppDispatch } from '../../hook';
import { toggleProtect, toggleCityDevelop } from '../../store/countrySlice';
import { ICity, IStatus } from '../../types/types';
import cl from "./City.module.css"
import redCross from "./../../assets/not-shield14.svg"

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
                <h2 className={cl.city__name}>{city.city_name}</h2>
                <img className={cl.city__photo} src={city.photo} alt={city.city_name +  " city"} />
                <div className={cl.city__metrics}>
                    <p className={cl.city__metric}><span>Progress</span><span>{city.progress}%</span></p>
                    <hr className={cl.hr_black}/>
                    <p className={cl.city__metric}><span>Live level</span><span>{city.live_level}%</span></p>
                    <hr className={cl.hr_black}/>
                    <p className={cl.city__metric}><span>Profit</span><span>{city.profit}$</span></p>
                    <hr className={cl.hr_black}/>
                    <p className={cl.city__metric}><span>Shield</span>
                    { city.shield ? ( 
                        <img src="https://cdn-icons-png.flaticon.com/512/18/18442.png" alt="tick" />
                    ) : (
                        <img src={redCross} alt="cross" />
                    )}</p>
                    <hr className={cl.hr_black}/>
                </div>
                <div>
                    { isPresident.isPresident ? ( // For president and admin
                        <div style={{marginLeft: "6px"}}>
                            <Checkbox 
                                formState={form.cities[id].develop}
                                price={150}
                                budget={budget}
                                toggleStatus={() => dispatch(toggleCityDevelop({status:form.cities[id].develop, id: id, price: 150}))}
                            >Develop (150$)</Checkbox>
                            <Checkbox 
                                formState={form.cities[id].shield}
                                price={300}
                                budget={budget}
                                toggleStatus={() => dispatch(toggleProtect({ status: form.cities[id].shield, id: id, price: 300}))}
                                checked={city.shield}
                            >Protect (300$)</Checkbox>
                        </div>
                    ) : ( // For simple users
                        <div >
                            <p className={cl.city__price}>Develop (150$)</p>
                            <p className={cl.city__price}>Protect (300$)</p>
                        </div>
                    )}
                </div>
            </div>
            
        );
    } else {
        return (
            <div style={{backgroundColor: "#FFDFE1"}} className={cl.city}>
                <h2 style={{color: "#DD7474"}} className={cl.city__name}>{city.city_name}</h2>
                <img className={cl.city__photo} src={city.photo} alt={city.city_name +  " city"} />
                <div className={cl.city__metrics}>
                    <p style={{color: "#DD7474"}} className={cl.city__metric}><span>Progress</span><span> - </span></p>
                    <hr style={{borderColor: "#DD7474"}} className={cl.hr_black}/>
                    <p style={{color: "#DD7474"}} className={cl.city__metric}><span>Live level</span><span> - </span></p>
                    <hr style={{borderColor: "#DD7474"}} className={cl.hr_black}/>
                    <p style={{color: "#DD7474"}} className={cl.city__metric}><span>Profit</span><span> - </span></p>
                    <hr style={{borderColor: "#DD7474"}} className={cl.hr_black}/>
                    <p style={{color: "#DD7474"}} className={cl.city__metric}><span>Shield</span> <img src={redCross} alt="cross" /></p>
                    <hr style={{borderColor: "#DD7474"}} className={cl.hr_black}/>
                </div>
                <div className={cl.city__state_block}>
                    <p className={cl.city__state}>Destroyed</p>
                </div>
            </div>
            
        );
    }
};

export default City;