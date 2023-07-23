import {FC, useState, useEffect } from 'react';
import { ICountry } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hook';
import { toggleNuclearStatus, toggleEcologyDevelop, toggleEnemyCheckbox,toggleSanctionCheckbox } from '../../store/countrySlice';
import cl from "./Country.module.css"
import City from '../../components/city/City';
import Checkbox from '../../components/UI/checkbox/Checkbox';
import EnemyCheckbox from '../../components/UI/enemyCheckbox/EnemyCheckbox';
import SanctionCheckbox from '../../components/UI/sanctionsCheckbox/SanctionCheckbox';
import Metric from '../../components/metric/Metric';
import axios from 'axios';
import PartitionTitle from '../../components/patitionTitle/PartitionTitle';
import Counter from '../../components/counter/Counter';
import Printer from '../../components/Printer/Printer';
import BarChart from '../../components/UI/charts/BarChart';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'

import bomb from "../../assets/rocket-counter.svg"
import ButtonBottom from "./../../assets/button-fire.png"
import FireTop from "./../../assets/fire-top.png"
import Pen from "./../../assets/Pen.svg"
import GrowthChart from '../../components/UI/charts/GrowthChart';

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

    const getColorByValue = (value: number | null): string | null => {
        if (value != null && value <= 35) {
            return '#DD7474'; 
        } else if (value != null && value > 35 && value < 70) {
            return '#E1BC5C'; 
        } else if (value != null && value >= 70){
            return '#5ACA85'; 
        } else {
            return null;
        }      
    };

    const chartData = {
        labels: countriesPublic.countries.map( item => item.country),
        datasets: [
            {
                label: 'Average live level',
                data: countriesPublic.countries.map( item => item.average_live_level),
                backgroundColor: countriesPublic.countries.map(item => getColorByValue(item.average_live_level)),
            }, 
        ],
    };

    const ecologyData = [
        { round: "Round 1", value: 80 },
        { round: "Round 2", value: 95 },
        { round: "Round 3", value: 75 },
        { round: "Round 4", value: 53 },
        { round: "Round 5", value: 20 },
        { round: "Round 6", value: 13 },
        // Добавьте или измените данные, как вам необходимо
    ];

    const metricData = {
        labels: ecologyData.map( item => item.round),
        datasets: [
            {
                label: 'Ecology',
                data: ecologyData.map( item => item.value),
                backgroundColor: ecologyData.map(item => getColorByValue(item.value)),
            }, 
        ],
    };

    
      

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

    const [pageState, setPageState] = useState(1);
    const [otherBookmarkColorStyle, setOtherBookmarkColorStyle] = useState([cl.bookmark__grey, cl.bookmark__other]);
    const [yourBookmarkColorStyle, setYourBookmarkColorStyle] = useState([cl.bookmark, cl.bookmark__your]);
    const [pagesColors, setPagesColors] = useState({
        other: "#C1C1C1",
        your: "#fff"
    });

    function otherMain(){
        if(pageState != 3){
            setPageState(3);
            setOtherBookmarkColorStyle([cl.bookmark__other, cl.bookmark ]);
            setYourBookmarkColorStyle([cl.bookmark__your, cl.bookmark__grey ]);
            setPagesColors({other: "#fff", your: "#C1C1C1"});
        }
    }

    function yourMain(){
        if(pageState != 1){
            setPageState(1);
            setOtherBookmarkColorStyle([cl.bookmark__other, cl.bookmark__grey ]);
            setYourBookmarkColorStyle([cl.bookmark__your, cl.bookmark ]);
            setPagesColors({other: "#C1C1C1", your: "#fff"}); 
        }
    }

    const [buttonPosition, setButtonPosition] = useState({transform: "translateX(-100vw)", transition: ".4s"})

    useEffect(() => {
        if(country.rockets > form.rockets) setButtonPosition({transform: "translateX(0px)", transition: ".4s"});
        else setButtonPosition({transform: "translateX(-100vw)", transition: ".4s"});   
    }, [form.rockets]);    
    
    return (
        <div className={cl.country}>
            <div className={cl.container}>
                <div className={cl.country__table}>
                    <section className={cl.country__print}>
                        <div>
                            <Printer />
                            <div id={cl.pen}>
                                <img src={Pen} />
                            </div>
                        </div>                       
                        <button style={buttonPosition} id={cl.fire__button} onClick={clickHandler} type="submit">
                            <img src={ButtonBottom} alt="button fire" />
                            <img className={cl.fire__top} src={FireTop}></img>
                        </button>
                    </section>
                    { isPresident.isPresident ? (
                        <section className={cl.country__documents}>
                            <section style={{background: pagesColors.other, zIndex: pageState }}  className={cl.country__other}>
                                <div className={otherBookmarkColorStyle.join(" ")}> 
                                    <div onClick={otherMain} className={cl.bookmark__text}>
                                        Other countries
                                    </div>
                                </div>
                                <section>
                                    {forAdmin ? (
                                        <div></div>  
                                    ) : (
                                        <div>
                                            <GrowthChart data={metricData}/> 
                                            <BarChart data={chartData}/>  
                                        </div> 
                                    )}
                                    <div className={cl.countries__information}>
                                        {countriesPublic.countries.map( (country, index) => 
                                            <div key={country.country}>
                                                <div>
                                                    <h3 className={cl.countries__name}>{country.country}</h3>
                                                </div>
                                                <div>
                                                    { country.cities.map((city, index) => 
                                                    city.state ? (
                                                        <p className={cl.countries__city} key={city.city_name}>{city.city_name}: {city.live_level}%</p>
                                                    ) : (
                                                        <p className={cl.countries__city} key={city.city_name}>
                                                            {city.city_name}: <img className={cl.city__destoyed} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/800px-Cross_red_circle.svg.png" alt="cross" />
                                                        </p> 
                                                    )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                    
                                </section>
                            </section>
                            <section style={{background: pagesColors.your}} className={cl.country__your}>
                                <div className={yourBookmarkColorStyle.join(" ")}> 
                                    <div onClick={yourMain} className={cl.bookmark__text}>
                                        Your country
                                    </div>
                                </div>
                                <section className={cl.country__info}>
                                    <div className={cl.country__title}>
                                        <img className={cl.country__flag} src={country.flag_photo} />
                                        <h2 className={cl.country__name}>{country.country}</h2>
                                    </div>
                                    <div className={cl.country__metrics}>
                                        <Metric indicator={"Average live level"} index={country.average_live_level} unit={"%"} />
                                        <Metric indicator={"Ecology"} index={country.ecology} unit={"%"}/>
                                        <Metric indicator={"Budget"} index={form.budget} unit={"$"} width={"65px"}/>
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
                                                                formState={form.enemies[index].cities[id].is_attacked}
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