import React, { FC, useState, useEffect } from 'react';
import cl from "./../../pages/country/Country.module.css"
import Metric from '../metric/Metric';
import City from '../city/City';
import PartitionTitle from '../patitionTitle/PartitionTitle';
import EnemyCheckbox from '../UI/enemyCheckbox/EnemyCheckbox';
import GrowthChart from '../UI/charts/GrowthChart';
import BarChart from '../UI/charts/BarChart';
import SanctionCheckbox from '../UI/sanctionsCheckbox/SanctionCheckbox';
import Checkbox from '../UI/checkbox/Checkbox';
import Counter from '../counter/Counter';
import { useAppSelector, useAppDispatch } from '../../hook';
import { 
    toggleNuclearStatus, 
    toggleEcologyDevelop, 
    toggleEnemyCheckbox,
    toggleSanctionCheckbox,
} from '../../store/countrySlice';
import bomb from "../../assets/rocket-counter.svg"


interface PresidentPageProps{
    clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    resetInfo: (e:  React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const PresidentPage: FC<PresidentPageProps> = ({clickHandler, resetInfo}) => {
    
    const form = useAppSelector(state => state.form.formResult);
    const country = useAppSelector(state => state.country.initialStateCountry);
    const countriesPublic = useAppSelector(state => state.countriesPublic.initialStateCountriesPublic);

    const dispatch = useAppDispatch();

    const [gameEnded, setGameEnded] = useState<boolean>(false);

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

    useEffect(() => {
        let count = 0;
        country.cities.forEach( item => {
            if( item.state == false){
                console.log(5000);
               count++;
            } else {
                console.log(9000);
            }
        })
        if(count == 4){
            setGameEnded(true);
        }
    }, [])

    return (
        <section style={{margin: "40px auto"}} className={cl.country__documents}>
            <section style={{background: pagesColors.other, zIndex: pageState }}  className={cl.country__other}>
                <div className={otherBookmarkColorStyle.join(" ")}> 
                    <div onClick={otherMain} className={cl.bookmark__text}>
                        Other countries
                    </div>
                </div>
                <section>
                    <GrowthChart/> 
                    <BarChart/>  
                    <div className={cl.countries__information}>
                        {countriesPublic.countries && countriesPublic.countries.map( (country, index) => 
                            <div className={cl.countries__country} key={`${country.country }-${index}`}>
                                <h3 className={cl.countries__name}>{country.country}</h3>
                                <div className={cl.countries__cities}>
                                    { country.cities.map((city, index) => 
                                        city.state ? (
                                            <p className={cl.countries__city} key={`${city.city_name}-r${index}`}>{city.city_name}: {city.live_level}%</p>
                                        ) : (
                                            <p className={cl.countries__city} key={`${city.city_name}-r${index}`}>
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
                        <Metric indicator={"Round"} index={country.round} />
                        <Metric indicator={"Average live level"} index={country.average_live_level} unit={"%"} />
                        <Metric indicator={"Ecology"} index={country.ecology} unit={"%"}/>
                        <Metric indicator={"Budget"} index={form.budget} unit={"$"} width={"65px"}/>
                    </div> 
                </section>
                <span className={cl.hr_big}></span>
                <section>
                    <form action="#">
                        <section className={cl.cities__information}>
                            {country.cities.map((item, index) => 
                                <City 
                                    budget={form.budget}
                                    key={`${item.city_name}${item.photo}`}
                                    city={item} 
                                    id={index} 
                                />                     
                            )}
                        </section>
                        <span className={cl.hr_big}></span>
                        {gameEnded ? (
                            <div>
                                <div className={cl.country__state_block}>
                                    <p className={cl.country__state}>you lose</p>
                                    <p className={cl.country__state_small}>
                                        Apparently your tactics didn't work.... <br/>
                                        You should analyze your actions and next time act on the basis of your experience.
                                    </p>
                                    <button className={cl.position__button} onClick={resetInfo} type="button">Reset information</button>
                                </div>
                            </div>
                        ) : (
                            <section>
                                <section className={cl.section__columns}>
                                    <div className={cl.section__column}>
                                        <PartitionTitle  title="Nuclear technology" text="Nuclear technology is needed to build rockets"/>
                                        <Checkbox 
                                            formState={form.nuclear_technology}
                                            price={500}
                                            budget={form.budget}
                                            toggleStatus={() => dispatch(toggleNuclearStatus({ status: form.nuclear_technology, price: 500}))} 
                                            checked={country.nuclear_technology}
                                        >Develop nuclear program (500$)</Checkbox>
                                    
                                        {country.nuclear_technology ? (
                                            <div>
                                                <div style={{marginTop: "10px"}}></div>
                                                <PartitionTitle title="Order nuclear rockets" text="The ordered rockets will not appear in the arsenal until next round"/>
                                                <Counter/> 
                                                <div style={{marginTop: "10px"}}></div>
                                            </div> 
                                        ) : (
                                            <div></div>
                                        )}               
                                    </div>
                                    <div className={cl.section__column}>
                                        <PartitionTitle  title="Ecology" text="Investing in the environment will help improve living standards not only in your country, but also on the planet"/>
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
                                        <PartitionTitle  title="Order to attack" text="Select the cities you want to attack, but note that if there is a shield on the enemy city - the missile will only destroy the shield and the city will remain intact"/>
                                        <div className={cl.rocket__counter}>
                                            <span className={cl.country__bomb}> {form.rockets}/{country.rockets} </span>
                                            <img src={bomb}/>
                                        </div>
                                    </div>
                                    <div className={cl.enemies}>
                                    { form.enemies.map((enemy, index) => 
                                        <div key={enemy.country} className={cl.enemy}>
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
                                <section >
                                    <div className={cl.country__sanctions}>
                                        <div className={cl.country__sanction}>
                                            <PartitionTitle  title="Introduction of sanctions" text="Select the country to sanction. If sanctions are imposed, the country will lose part of its income. But note that this may affect relations with that country"/>
                                            { form.enemies.map((enemy, index) => 
                                                <SanctionCheckbox 
                                                key={`${enemy.country}-${index}`}
                                                checked={enemy.sanctions}
                                                toggleStatus={() => dispatch(toggleSanctionCheckbox({status: form.enemies[index].sanctions, index: index}))}
                                                >{enemy.country}</SanctionCheckbox> 
                                            )}
                                        </div>
                                        <div className={cl.country__sanction}>
                                            <PartitionTitle  title="Relations with other countries" text="This shows the attitude of other countries towards you"/>
                                            {form.enemies.map((enemy, index) => 
                                                enemy.sanctions_from ? (
                                                    <p className={cl.relationship} key={`${enemy.country}${index}r`}>{enemy.country}: Sanctions have been announced...</p>
                                                ) : (
                                                    <p className={cl.relationship} key={`${enemy.country}${index}r`}>{enemy.country}: Good relationship...</p> 
                                                )
                                            )}
                                        </div>
                                    </div>
                                </section>
                                <section style={{marginTop: "100px"}} className={[cl.section__columns, cl.section__columns_row].join(" ")}>
                                    <div className={cl.country__position}>
                                        <p className={cl.position__text}>The President <br/>of the Republic</p>
                                    </div>
                                    <div className={cl.country__button}>
                                        <button className={cl.button} onClick={clickHandler} type="submit">
                                            { country.rockets > form.rockets && country.round < 7   ? (
                                                <div className={cl.stamp__grey_red}></div>
                                            ) : country.round < 7 ? (
                                                <div className={cl.stamp__grey_blue}></div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </button>
                                    </div>
                                </section>
                            </section>
                        )}
                         
                    </form>
                </section>
            </section>
        </section>
    );
};

export default PresidentPage;
