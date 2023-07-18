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
import Metric from '../../components/metric/Metric';
import axios from 'axios';
import PrinterTop from "./../../assets/print-top.svg"
import PrinterBottom from "./../../assets/print-bottom.svg"
import PartitionTitle from '../../components/patitionTitle/PartitionTitle';
import BarChart from '../../components/UI/charts/BarChart';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'

import bomb from "../../assets/rocket-counter.svg"

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
        try {
            const response = await axios.post("http://127.0.0.1:8000/round_form", form);
            console.log(response.data);
            return response;
        } catch (error) {
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
                <div className={cl.country__table}>
                    <section className={cl.country__print}>
                        <div className={cl.printer}>
                            <img src={PrinterTop} />
                            <img src={PrinterBottom}></img>
                            <form className={cl.printer__form}>
                                <div>
                                    <select id={cl.country} name="country" className={cl.printer__input} value={donateForm.to} onChange={handleChangeTo}>
                                        <option value="">Choose country...</option>
                                        {form.enemies.map( enemy => 
                                            <option 
                                            key={enemy.country} 
                                            value={enemy.country}>{enemy.country}</option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <input 
                                        type="number" 
                                        id="amount" 
                                        name="amount" 
                                        value={donateForm.amount} 
                                        onChange={handleChangeAmount}
                                        placeholder="Enter an amount " 
                                        className={cl.printer__input}
                                        required 
                                    /> 
                                </div>
                                
                                <div id={cl.printer__button_container}>
                                    <button id={cl.printer__button} type="submit" onClick={donate}>
                                        Print
                                    </button>
                                    <div className={cl.printer__button_bottom}></div>
                                </div>
                                
                            </form>
                            
                        </div>
                    </section>
                    { isPresident.isPresident ? (
                        <section className={cl.country__documents}>
                            <section className={cl.country__other}>
                                {/* <section>
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
                                </section> */}
                            </section>
                            <section className={cl.country__your}>
                                <section className={cl.country__info}>
                                    <div className={cl.country__title}>
                                        <img className={cl.country__flag} src={country.flag_photo} />
                                        <h2 className={cl.country__name}>{country.country}</h2>
                                    </div>
                                    <div className={cl.country__metrics}>
                                        <Metric 
                                            indicator={"Average live level"}
                                            index={country.average_live_level}
                                            unit={"%"}
                                        />
                                        <Metric 
                                            indicator={"Ecology"}
                                            index={country.ecology}
                                            unit={"%"}
                                        />
                                        <Metric 
                                            indicator={"Budget"}
                                            index={form.budget}
                                            unit={"$"}
                                        />
                                    </div> 
                                </section>
                                <span className={cl.hr_big}></span>
                                <section>
                                    <form action="#" >
                                        <section className={cl.cities__information}>
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
                                        <span className={cl.hr_big}></span>
                                        <section className={cl.section__columns}>
                                            <div className={cl.section__column}>
                                                <PartitionTitle  title="Nuclear technology" text="Это подсказка для примера"/>
                                                <Checkbox 
                                                    formState={form.nuclear_technology}
                                                    price={500}
                                                    budget={form.budget}
                                                    toggleStatus={() => dispatch(toggleNuclearStatus({ status: form.nuclear_technology, price: 500}))} 
                                                    checked={country.nuclear_technology}
                                                >Develop nuclear program (500$)</Checkbox>
                                                <PartitionTitle  title="Order nuclear rockets" text="Это подсказка для примера"/>
                                                <input type="number" min="0" max={possibleRocketLimit} onChange={changeRocketOrder} value={rocketOrder} />
                                                <button type="button" onClick={activateRocketOrder}>Order</button>
                                                <button type="button" onClick={cancelRocketOrder}>Cancel</button>
                                                <span>{form.rocket_order}</span>                                 
                                            </div>
                                            <div className={cl.section__column}>
                                                <PartitionTitle  title="Ecology" text="Это подсказка для примера"/>
                                                <Checkbox 
                                                    formState={form.ecology}
                                                    price={200}
                                                    budget={form.budget}
                                                    toggleStatus={() => dispatch(toggleEcologyDevelop({status: form.ecology, price: 200}))}
                                                >Develop ecology (200$)</Checkbox>
                                            </div>
                                        </section >
                                        <span className={cl.hr_big}></span>
                                        <section className={cl.section__columns}>
                                            <div>
                                                <PartitionTitle  title="Order to attack" text="Это подсказка для примера"/>
                                                <div className={cl.rocket__counter}>
                                                    <span className={cl.country__bomb}> {form.rockets}/{country.rockets} </span>
                                                    <img src={bomb}/>
                                                </div>
                                                
                                            </div>
                                            <div className={cl.enemies}>
                                            { form.enemies.map((enemy, index) => 
                                                <div className={cl.enemy}>
                                                    <p className={cl.enemy__country}>{enemy.country}</p>
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
                                        </section>
                                        <span className={cl.hr_big}></span>
                                        <section>
                                            <div className={cl.country__sanctions}>
                                                <div className={cl.country__sanction}>
                                                    <PartitionTitle  title="Introduction of sanctions" text="Это подсказка для примера"/>
                                                    { form.enemies.map((enemy, index) => 
                                                        <SanctionCheckbox 
                                                        key={index}
                                                        checked={enemy.sanctions}
                                                        toggleStatus={() => dispatch(toggleSanctionCheckbox({status: form.enemies[index].sanctions, index: index}))}
                                                        >{enemy.country}</SanctionCheckbox> 
                                                    )}
                                                </div>
                                                <div className={cl.country__sanction}>
                                                    <PartitionTitle  title="Relations with other countries" text="Это подсказка для примера"/>
                                                    {form.enemies.map((enemy, index) => 
                                                        enemy.sanctinosFrom ? (
                                                            <p className={cl.relationship} key={enemy.country}>{enemy.country}: Объявлены санкции</p>
                                                        ) : (
                                                            <p className={cl.relationship} key={enemy.country}>{enemy.country}: Нормальные отношения</p> 
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <div className={cl.country__button}>
                                                <button className={cl.button} onClick={clickHandler} type="submit">Send order</button>
                                            </div>
                                        </section> 
                                    </form>
                                </section>
                            </section>
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
        </div>
    );
};

export default Country;