import {FC, useState, useEffect} from 'react';
import { ICountry } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hook';
import { toggleNuclearStatus, toggleEcologyDevelop } from '../../store/countrySlice';
import cl from "./Country.module.css"
import City from '../../components/city/City';
import Checkbox from '../../components/UI/checkbox/Checkbox';
import EnemyCheckbox from '../../components/UI/enemyCheckbox/EnemyCheckbox';

import BarChart from '../../components/UI/charts/BarChart';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'

import bomb from "../../assets/bomb-cursor.png"




interface CountryProps{
    forAdmin?: ICountry;
}



const Country: FC<CountryProps> = ({forAdmin}) => {

    const form = useAppSelector(state => state.form);
    const isPresident = useAppSelector(state => state.status);
    let country = useAppSelector(state => state.country);
    if (forAdmin) country = forAdmin;
    const dispatch = useAppDispatch();


    const countriesPublic = useAppSelector(state => state.countriesPublic);
    console.log(countriesPublic);
    const chartData = {
        labels: countriesPublic.countries.map( item => item.country),
        datasets: [
            {
                label: 'Average live level',
                data: countriesPublic.countries.map( item => item.average__live__level),
                backgroundColor: '#55828B',
            },
        ],
    };

    const handleToggleNuclearStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        dispatch(toggleNuclearStatus({status: form.nuclear__program, price: 500, component: event.target}))
    }

    return (
        <div className={cl.country}>
            <div className={cl.container}>
                {/* {forAdmin ? (
                    <div></div>  
                ) : (
                    // <BarChart data={chartData}/>   
                )} */}
                <section className={cl.country__info}>
                    <div className={cl.country__title}>
                        <img className={cl.country__flag} src={country.flag__photo} alt={"flag " + country.country} />
                        <h2 className={cl.country__name}>{country.country}</h2>
                    </div>
                    <div className={cl.country__stats}>
                        <div className={cl.country__live_level}>
                            <p className={cl.country__indicator}>Average <br/>live level:</p>
                            <p className={cl.country__index}>{country.average__live__level}%</p>
                        </div>
                        <div className={cl.country__budget}>
                            <p className={cl.country__indicator}>Your <br/>Budget:</p>
                            <p className={cl.country__index}>{form.budget}$</p>
                        </div>    
                    </div> 
                </section>
                { isPresident.isPresident ? ( // For president and admin
                    <form>
                        <section className={cl.cities__info}>
                            {country.cities.map((item, index) => 
                                <City 
                                    key={index} 
                                    city={item} 
                                    id={index}
                                    isPresident={isPresident}
                                />                     
                            )}
                        </section>
                        <section>
                            <div className={cl.country__development}>
                                <div className={cl.country__dev_col}>
                                    
                                    <h3>Nuclear program:</h3>
                                    <Checkbox 
                                        toggleStatus={handleToggleNuclearStatus} 
                                        checked={country.nuclear__program}
                                    >Develop nuclear program (500$)</Checkbox>
                                    <div className={cl.country__input}>
                                        <p className={cl.input__text}>Order nuclear bombs (150$):</p>
                                        <input type="number" placeholder='2'/>
                                    </div>
                                </div>
                                <div className={cl.country__dev_col}>
                                    <h3>Ecology:</h3>
                                    <Checkbox 
                                        toggleStatus={() => dispatch(toggleEcologyDevelop({status: form.ecology, price: 200}))}
                                    >Develop ecology (200$)</Checkbox>
                                </div>
                            </div>
                            <div className={cl.country__development}>
                                <div>
                                    <h3>Order to attack:</h3>
                                    <span className={cl.country__bomb}> {country.bomb} </span>
                                    <img src={bomb}/>
                                </div>
                                { form.enemies.map(enemy => 
                                    <div>
                                        <p>{enemy.country}</p>
                                        <div>
                                            {enemy.cities.map(city => 
                                                <EnemyCheckbox stateCity={city.city__state}>{city.city__name}</EnemyCheckbox>
                                            )}
                                        </div>
                                    </div>
                                ) }
                                
                                
                            </div>
                            <div className={cl.country__development}>
                                <div className={cl.country__dev_col}>
                                    <h3>Introduction of sanctions:</h3>
                                
                                    { form.enemies.map(enemy => 
                                        <Checkbox checked={enemy.sanctions}>{enemy.country}</Checkbox> 
                                    ) }
                                </div>
                            </div>
                            <div className={cl.country__development}>
                                <form>
                                    <label for="country">Country: </label>
                                    <select id="country" name="country">
                                        <option value="">Choose country...</option>
                                        {form.enemies.map( enemy => 
                                            <option value={enemy.country}>{enemy.country}</option>
                                        )}
                                    </select>

                                    <label for="amount">Amount</label>
                                    <input type="number" id="amount" name="amount" placeholder="Enter an amount " min="0" required />

                                    <button type="submit">Отправить</button>
                                </form>
                            </div>
                            <div className={cl.country__button}>
                                <button className={cl.button} type="submit">Send order</button>
                            </div>
                        </section>
                        
                    </form>
                ):( // For simple users
                    <section>
                        <div className={cl.cities__info}>
                            {country.cities.map((item, index) => 
                                <City 
                                    key={index} 
                                    city={item} 
                                    id={index}
                                    isPresident={isPresident}
                                />                    
                            )}
                        </div>
                        <div className={cl.country__development}>
                            <div className={cl.country__dev_col}>
                                <h3>Nuclear program:</h3>
                                <p className={cl.input__text}>Develop nuclear program (500$)</p>
                                <p className={cl.input__text}>Order nuclear bombs (150$): 
                                    <span className={cl.country__bomb}> {country.bomb} </span> (at this moment)
                                </p>  
                            </div>
                            <div className={cl.country__dev_col}>
                                <h3>Ecology:</h3>
                                <p className={cl.input__text}>Develop ecology (200$)</p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Country;