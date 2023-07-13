import {FC, useState, useEffect} from 'react';
import { ICountry } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hook';
import {addRocketOrder, removeRocketOrder, toggleNuclearStatus, toggleEcologyDevelop, toggleEnemyCheckbox,toggleSanctionCheckbox, donatFromBudget } from '../../store/countrySlice';
import cl from "./Country.module.css"
import City from '../../components/city/City';
import Checkbox from '../../components/UI/checkbox/Checkbox';
import EnemyCheckbox from '../../components/UI/enemyCheckbox/EnemyCheckbox';
import SanctionCheckbox from '../../components/UI/sanctionsCheckbox/SanctionCheckbox';
import Tooltip from '../../components/UI/tooltip/Tooltip';
import axios from 'axios';
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
    const chartData = {
        labels: countriesPublic.countries.map( item => item.country),
        datasets: [
            {
                label: 'Average live level',
                data: countriesPublic.countries.map( item => item.average_live_level),
                backgroundColor: '#55828B',
            },
        ],
    };

    const [donateForm, setDonateForm] = useState({
        to: "",
        amount: 0,
    })

    const [possibleRocketLimit, setPossibleRocketLimit] = useState<number>(0);

    useEffect(() => {
        setPossibleRocketLimit(Math.floor(form.budget/150));
    }, [form.budget]);

    const [rocketOrder, setRocketOrder] = useState<number>(0);

    function changeRocketOrder(e: React.ChangeEvent<HTMLInputElement>) {
        if(rocketOrder <= possibleRocketLimit) setRocketOrder(Number(e.target.value));
        else setRocketOrder(possibleRocketLimit);
    }

    function activateRocketOrder(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if(rocketOrder <= possibleRocketLimit && form.rocket_order != 0 && rocketOrder != 0){
            dispatch(addRocketOrder({order: rocketOrder}));
            setRocketOrder(0);
        } else if (rocketOrder == 0){
            console.log("at this moment you not choose any rocket");
        } else if (rocketOrder <= possibleRocketLimit && form.rocket_order == 0){
            dispatch(addRocketOrder({order: rocketOrder}));
            setRocketOrder(0);
        } else {
            console.log("you no have money");
        }
    }

    function cancelRocketOrder(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if (form.rocket_order != 0){
            console.log("you remove order with " + form.rocket_order + " rockets");
            dispatch(removeRocketOrder());
            setRocketOrder(0);
        } else {
            console.log("you haven't got any order");
        }
    }

    function donate(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        dispatch(donatFromBudget({amount: donateForm.amount, countryTo: donateForm.to}));
        console.log(donateForm);
        setDonateForm({ to: "", amount: 0, });
    }

    function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
        setDonateForm({ ...donateForm, amount: Number(e.target.value)});
    }

    function handleChangeTo(e: React.ChangeEvent<HTMLSelectElement>) {
        setDonateForm({ ...donateForm, to: e.target.value});
    }

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(form);
        e.preventDefault();
        postForm();
    }

    async function postForm(){
        try{
            const response = await axios.post("http://127.0.0.1:8000/round_form", form);
            console.log(response.data);
            return response;
        }catch (error){
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    return (
        <div className={cl.country}>
            <div className={cl.container}>
                <section>
                {forAdmin ? (
                    <div></div>  
                ) : (
                    <BarChart data={chartData}/>   
                )}
                <div className={cl.countires__information}>
                    {countriesPublic.countries.map( (country, index) => 
                        <div key={country.country}>
                            <div>
                                <h3>{country.country}</h3>
                            </div>
                            <div>
                                { country.cities.map((city, index) => 
                                city.state ? (
                                    <p key={city.city_name}>{city.city_name}: {city.live_level}%</p>
                                ) : (
                                    <p key={city.city_name}>{city.city_name}: <img className={cl.city__destoyed} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/800px-Cross_red_circle.svg.png" alt="cross" /></p> 
                                )
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                </section>
                <section className={cl.country__info}>
                    <div className={cl.country__title}>
                        <img className={cl.country__flag} src={country.flag_photo} />
                        <h2 className={cl.country__name}>{country.country}</h2>
                    </div>
                    <div className={cl.country__info_stats}>
                        <div className={cl.country__live_level}>
                            <p className={cl.country__indicator}>Average live level:</p>
                            <p className={cl.country__index}>{country.average_live_level}%</p>
                        </div>
                        <div className={cl.country__budget}>
                            <p className={cl.country__indicator}>Your budget:</p>
                            <p className={cl.country__index}>{form.budget}$</p>
                        </div>  
                        <div className={cl.country__ecology}>
                            <p className={cl.country__indicator}>Ecology:</p>
                            <p className={cl.country__index}>{country.ecology}%</p>
                        </div>  
                    </div> 
                </section>
                { isPresident.isPresident ? ( // For president and admin
                    <section>
                        <form action="#" >
                            <section className={cl.cities__info}>
                                {country.cities.map((item, index) => 
                                    <City 
                                        budget={form.budget}
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
                                        <div className={cl.tooltip}>
                                            <h3>Nuclear program:</h3>
                                            <Tooltip text="Это подсказка для примера" />
                                        </div>
                                        <Checkbox 
                                            formState={form.nuclear_technology}
                                            price={500}
                                            budget={form.budget}
                                            toggleStatus={() => dispatch(toggleNuclearStatus({ status: form.nuclear_technology, price: 500}))} 
                                            checked={country.nuclear_technology}
                                        >Develop nuclear program (500$)</Checkbox>
                                        <div className={cl.country_input}>
                                            <div className={cl.tooltip}>
                                                <h3>Order nuclear bombs (150$);</h3>
                                                <Tooltip text="Это подсказка для примера" />
                                            </div>
                                            <input type="number" min="0" max={possibleRocketLimit} onChange={changeRocketOrder} value={rocketOrder} />
                                            <button type="button" onClick={activateRocketOrder}>Order</button>
                                            <button type="button" onClick={cancelRocketOrder}>Cancel</button>
                                            <span>In next round you will have {form.rocket_order} rockets</span>
                                        </div>
                                    </div>
                                    <div className={cl.country__dev_col}>
                                        <div className={cl.tooltip}>
                                            <h3>Ecology:</h3>
                                            <Tooltip text="Это подсказка для примера" />
                                        </div>
                                        <Checkbox 
                                            formState={form.ecology}
                                            price={200}
                                            budget={form.budget}
                                            toggleStatus={() => dispatch(toggleEcologyDevelop({status: form.ecology, price: 200}))}
                                        >Develop ecology (200$)</Checkbox>
                                    </div>
                                </div>
                                <div key={34} className={cl.country__development}>
                                    <div>
                                        <div className={cl.tooltip}>
                                            <h3>Order to attack:</h3>
                                            <Tooltip text="Это подсказка для примера" />
                                        </div>
                                        <span className={cl.country__bomb}> {form.rockets} </span>
                                        <img src={bomb}/>
                                    </div>
                                    { form.enemies.map((enemy, index) => 
                                        <div>
                                            <p>{enemy.country}</p>
                                            <div>
                                                {enemy.cities.map((city, id) => 
                                                    <EnemyCheckbox 
                                                    formState={form.enemies[index].cities[id].state}
                                                    indexCol={index}
                                                    id={id}
                                                    key={city.city_name} 
                                                    stateCity={country.enemies[index].cities[id].state}
                                                    bombs={form.rockets}
                                                    toggleStatus={() => dispatch(toggleEnemyCheckbox({status: form.enemies[index].cities[id].city_state, index: index, id: id}))}
                                                    >{city.city_name}</EnemyCheckbox>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={cl.country__development}>
                                    <div className={cl.country__sanctions}>
                                        <div className={cl.country__sanction}>
                                            <div className={cl.tooltip}>
                                                <h3>Introduction of sanctions:</h3>
                                                <Tooltip text="Это подсказка для примера" />
                                            </div>
                                            { form.enemies.map((enemy, index) => 
                                                <SanctionCheckbox 
                                                key={index}
                                                checked={enemy.sanctions}
                                                toggleStatus={() => dispatch(toggleSanctionCheckbox({status: form.enemies[index].sanctions, index: index}))}
                                                >{enemy.country}</SanctionCheckbox> 
                                            )}
                                        </div>
                                        <div className={cl.country__sanction}>
                                            <div className={cl.tooltip}>
                                                <h3>Отношения с другими странами:</h3>
                                                <Tooltip text="Это подсказка для примера" />
                                            </div>
                                            {form.enemies.map((enemy, index) => 
                                                enemy.sanctinosFrom ? (
                                                    <p key={enemy.country}>{enemy.country}: Объявлены санкции</p>
                                                ) : (
                                                    <p key={enemy.country}>{enemy.country}: Нормальные отношения</p> 
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={cl.country__button}>
                                    <button className={cl.button} onClick={clickHandler} type="submit">Send order</button>
                                </div>
                            </section>     
                        </form>
                        <div className={cl.country__development}>
                            <form>
                                <label>Country: 
                                    <select id="country" name="country" value={donateForm.to} onChange={handleChangeTo}>
                                        <option value="">Choose country...</option>
                                        {form.enemies.map( enemy => 
                                            <option 
                                            key={enemy.country} 
                                            value={enemy.country}>{enemy.country}</option>
                                        )}
                                    </select>
                                </label>
                                <label>
                                    Amount:
                                    <input 
                                        type="number" 
                                        id="amount" 
                                        name="amount" 
                                        value={donateForm.amount} 
                                        onChange={handleChangeAmount}
                                        placeholder="Enter an amount " 
                                        min="0" 
                                        required 
                                    />
                                </label>
                                <button type="submit" onClick={donate} >Отправить</button>
                            </form>
                        </div>
                   </section> 
                ):( // For simple users
                <section>
                    <form action="#" >
                        <section className={cl.cities__info}>
                            {country.cities.map((item, index) => 
                                <City 
                                    budget={form.budget}
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
                                    <div className={cl.tooltip}>
                                        <h3>Nuclear program:</h3>
                                        <Tooltip text="Это подсказка для примера" />
                                    </div>
                                    
                                    Develop nuclear program (500$)
                                    
                                    <div className={cl.tooltip}>
                                        <h3>Nuclear bombs (150$);</h3>
                                        <Tooltip text="Это подсказка для примера" />
                                    </div>
                                    Order nuclear bomb (150$)
                                    
                                </div>
                                <div className={cl.country__dev_col}>
                                    <div className={cl.tooltip}>
                                        <h3>Ecology:</h3>
                                        <Tooltip text="Это подсказка для примера" />
                                    </div>
                                    Develop ecology (200$)
                                </div>
                            </div>
                            <div key={34} className={cl.country__development}>
                                <div>
                                    <div className={cl.tooltip}>
                                        <h3>Order to attack:</h3>
                                        <Tooltip text="Это подсказка для примера" />
                                    </div>
                                    <span className={cl.country__bomb}> {form.rockets} </span>
                                    <img src={bomb}/>
                                </div>
                                { form.enemies.map((enemy, index) => 
                                    <div>
                                        <p>{enemy.country}</p>
                                        <div>
                                            {enemy.cities.map((city, id) => 
                                                <EnemyCheckbox 
                                                formState={form.enemies[index].cities[id].state}
                                                indexCol={index}
                                                id={id}
                                                key={city.city_name} 
                                                stateCity={country.enemies[index].cities[id].state}
                                                bombs={form.rockets}
                                                >{city.city_name}</EnemyCheckbox>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={cl.country__development}>
                                <div className={cl.country__sanctions}>
                                    <div className={cl.country__sanction}>
                                        <div className={cl.tooltip}>
                                            <h3>Отношения с другими странами:</h3>
                                            <Tooltip text="Это подсказка для примера" />
                                        </div>
                                        {form.enemies.map((enemy, index) => 
                                            enemy.sanctinosFrom ? (
                                                <p key={enemy.country}>{enemy.country}: Объявлены санкции</p>
                                            ) : (
                                                <p key={enemy.country}>{enemy.country}: Нормальные отношения</p> 
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>     
                    </form>
                </section>                        
                )}
            </div>
        </div>
    );
};

export default Country;