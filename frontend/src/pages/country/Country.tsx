import {FC, useState, useEffect} from 'react';
import { ICountry } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hook';
import {rocketOrder, toggleNuclearStatus, toggleEcologyDevelop, toggleEnemyCheckbox,toggleSanctionCheckbox, donatFromBudget } from '../../store/countrySlice';
import cl from "./Country.module.css"
import City from '../../components/city/City';
import Checkbox from '../../components/UI/checkbox/Checkbox';
import EnemyCheckbox from '../../components/UI/enemyCheckbox/EnemyCheckbox';
import SanctionCheckbox from '../../components/UI/sanctionsCheckbox/SanctionCheckbox';
import Tooltip from '../../components/UI/tooltip/Tooltip';
import Metric from '../../components/metric/Metric';
import axios from 'axios';
import PartitionTitle from '../../components/patitionTitle/PartitionTitle';
import Counter from '../../components/counter/Counter';
import BarChart from '../../components/UI/charts/BarChart';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'

import bomb from "../../assets/rocket-counter.svg"
import PrinterTop from "./../../assets/print-top.svg"
import PrinterBottom from "./../../assets/print-bottom.svg"
import ButtonBottom from "./../../assets/button-fire.png"
import FireTop from "./../../assets/fire-top.png"
import Pen from "./../../assets/Pen.svg"
import Stamp from "./../../assets/stamp.svg"

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
                        <div id={cl.pen}>
                            <img src={Pen} />
                        </div>
                        <button id={cl.fire__button} onClick={clickHandler} type="submit">
                            <img src={ButtonBottom} alt="" />
                            <img className={cl.fire__top} src={FireTop}></img>
                        </button>
                    </section>
                    { isPresident.isPresident ? (
                        <section className={cl.country__documents}>
                            <section className={cl.country__other}>
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
                            </section>
                            <section className={cl.country__your}>
                                <section className={cl.country__info}>
                                    <div className={cl.country__title}>
                                        <img className={cl.country__flag} src={country.flag_photo} />
                                        <h2 className={cl.country__name}>{country.country}</h2>
                                    </div>
                                    <div className={cl.country__metrics}>
                                        <Metric indicator={"Average live level"} index={country.average_live_level} unit={"%"} />
                                        <Metric indicator={"Ecology"} index={country.ecology} unit={"%"}/>
                                        <Metric indicator={"Budget"} index={form.budget} unit={"$"}/>
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
                                                <div style={{marginTop: "10px"}}></div>
                                                <PartitionTitle title="Order nuclear rockets" text="Это подсказка для примера"/>
                                                <Counter/>                  
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
                                                                toggleStatus={() => dispatch(toggleEnemyCheckbox({index: index, id: id}))}
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
                                                            <p className={cl.relationship} key={enemy.country}>{enemy.country}: Sanctions have been announced...</p>
                                                        ) : (
                                                            <p className={cl.relationship} key={enemy.country}>{enemy.country}: Good relationship...</p> 
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                        <section className={cl.section__columns}>
                                            <div className={cl.country__position}>
                                                <p className={cl.position__text}>The President of the<br/> Republic of Belarus </p>
                                            </div>
                                            <div className={cl.country__button}>
                                                <button className={cl.button} onClick={clickHandler} type="submit">
                                                    { country.rockets > form.rockets ? (
                                                        <div className={cl.stamp__grey_red}></div>
                                                    ) : (
                                                        <div className={cl.stamp__grey_blue}></div>
                                                    )}
                                                </button>
                                            </div>
                                        </section> 
                                    </form>
                                </section>
                            </section>
                        </section>
                    ):( // For simple users
                        <section className={cl.country__your}>
                            <section className={cl.country__info}>
                                <div className={cl.country__title}>
                                    <img className={cl.country__flag} src={country.flag_photo} />
                                    <h2 className={cl.country__name}>{country.country}</h2>
                                </div>
                                <div className={cl.country__metrics}>
                                    <Metric indicator={"Average live level"} index={country.average_live_level} unit={"%"} />
                                    <Metric indicator={"Ecology"} index={country.ecology} unit={"%"}/>
                                    <Metric indicator={"Budget"} index={form.budget} unit={"$"}/>
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
                                            <p className={cl.paragraph}>Develop nuclear program (500$)</p>
                                            <p className={cl.paragraph}>Nuclear rocket (150$) </p>                
                                        </div>
                                        <div className={cl.section__column}>
                                            <PartitionTitle  title="Ecology" text="Это подсказка для примера"/>
                                            <p className={cl.paragraph}>Develop ecology (200$)</p>
                                        </div>
                                    </section>
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
                                                            toggleStatus={() => dispatch(toggleEnemyCheckbox({index: index, id: id}))}
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
                                                        <p className={cl.relationship} key={enemy.country}>{enemy.country}: Sanctions have been announced...</p>
                                                    ) : (
                                                        <p className={cl.relationship} key={enemy.country}>{enemy.country}: Good relationship...</p> 
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                </form>
                            </section>
                        </section>                       
                    )}
                </div>
            </div>
        </div>
    );
};

export default Country;