import {FC, useEffect} from 'react';
import cl from "./Home.module.css"
import { useLocation, Link } from 'react-router-dom';

// Images
import telegram from "./../../assets/telegram-icon.svg"
import instagram from "./../../assets/instagram-icon.svg"
import facebook from "./../../assets/facebook-icon.svg"
import tiktok from "./../../assets/tiktok-icon.svg"
import discord from "./../../assets/discord-icon.svg"
import bomb from "./../../assets/bomb-down.svg"
import explosion from "./../../assets/explosion.svg"


const Home: FC = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <main>
            <section className={cl.main_overlay}>
                <div className={cl.container}>
                    <section className={cl.main_screen}>
                        <div className={cl.main_information}>
                            <h3>ONLINE GAME</h3>
                            <h1>WORLD<br/> DOMINATION</h1>
                            <p>- Discord Web Game is an immersive online experience where players engage in a strategic competition between nations.</p>
                            <div className={cl.main_buttons}>
                                <div className={cl.main_button__red}>
                                    <Link to="/login">Join the game</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cl.main_socials}>
                            <div className={cl.main_social}>
                                <a href="https://discord.com/"><img width="27" height="27" src={discord} alt="discord social"/></a>
                            </div>
                            <div className={cl.main_social}>
                                <a href="https://www.instagram.com/"><img width="27" height="27" src={instagram} alt="instagram social"/></a>
                            </div>
                            <div className={cl.main_social}>
                                <a href="https://pl-pl.facebook.com/"><img width="27" height="27" src={facebook} alt="facebook social"/></a>
                            </div>
                            <div className={cl.main_social}>
                                <a href="https://telegram.org/"><img width="27" height="27" src={telegram} alt="telegram social"/></a>
                            </div>
                            <div className={cl.main_social}>
                                <a href="https://www.tiktok.com/"><img width="27" height="27" src={tiktok} alt="tiktok social"/></a>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section className={cl.overlay} id="read">
                <div className={cl.container}>
                    <section className={cl.game_information}>
                        <div className={cl.game_general__items}>
                            <div className={cl.game_general__item}>
                                <p className={cl.game_general__text}>
                                    <span>12+</span><br/>without adults
                                </p>
                            </div>
                            <div className={cl.game_general__item_red}>
                                <p className={cl.game_general__text}>
                                    <span>10 - 40</span><br/>players
                                </p>
                            </div>
                            <div className={cl.game_general__item}>
                                <p className={cl.game_general__text}>
                                    <span>120</span><br/>minutes
                                </p>
                            </div>
                        </div>
                        <div className={cl.game_about}>
                            <div className={cl.game_information__grafic}>
                                <h2>ABOUT GAME</h2>
                                <hr className={cl.game_information__devider} />
                                <div className={cl.game_information__image}>
                                    <img src={bomb} width="115" height="278" alt="bomb"/>
                                </div>
                            </div>
                            <div className={cl.game_information__text}>
                                <p>
                                Imagine that you and your friends are a group of influential politicians. You have a red button at your disposal and an arsenal of nuclear warheads ready to wipe enemy cities off the face of the Earth at your command. On the other side of the screen are the governments of other countries. They could be a team of friends or people you are meeting for the first time. What can you expect? Peaceful cooperation or treacherous attacks? Generous investments or cunning economic sanctions? Trusting anyone is not an option. The status of a victorious superpower will belong to only one team!

                                Will you defend peaceful principles until the end or unleash a nuclear apocalypse on the planet? The decision is yours. In this game, you can do it all: engage in negotiations, bargain, bluff, and weave intrigues, or isolate yourself behind an iron curtain and secretly forge a weapon of retaliation. This thrilling mix of classic "Mafia" and turn-based political strategy will appeal to both those seeking fun and lovers of cunning tactics.
                                </p>
                                <div className={cl.game_join}>
                                    <Link to="/login">Join the game</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cl.game_about}>
                            <div className={cl.game_information__grafic}>
                                <h2>RULES OF THE GAME</h2>
                                <hr className={cl.game_information__devider} />
                                <div className={cl.game_information__image}>
                                    <img src={explosion} width="257" height="316" alt="explosion"/>
                                </div>
                            </div>
                            <div className={cl.game_information__text}>
                                <p>
                                Welcome to the game "World Domination"! It's a game of state rivalry on the global stage where you can launch nuclear bombs at each other. The game combines elements of Mafia, turn-based strategy, and role-playing. <br/>
                                <br/>
                                Each team represents the government of a world power. In the game, you will make decisions within your team and build relationships with other teams. <br/>
                                <br/>
                                The goal of the game is to achieve the status of a superpower. Only one country will emerge victorious by reaching the highest standard of living.<br/>
                                <br/>
                                To win, you can improve the economic indicators in your country or unleash a global war, destroying your competitors. Practice shows that both strategies have equal chances of success. In the game, you can communicate, form alliances, and weave intrigues. There are no restrictions on making promises to each other and then breaking them. The outcome of the game will largely depend on how well you can negotiate with each other. <br/>
                                <br/>
                                The game consists of six rounds and takes approximately 2 hours. At the beginning of each round, you will face the consequences of decisions made in the previous round.
                                <br/>
                                For example, if you decide to produce a nuclear bomb and allocate resources for it, in the next round, you will have a bomb in your arsenal that you can use. You will have a separate page with all the statistics about your country and a summary of neighboring countries. The statistics of your country will include information about four cities that can be developed, while your opponents can bomb them. The main indicator is the standard of living, which can either increase or decrease as a result of your actions and the actions of your opponents.<br/>
                                <br/>
                                To carry out game actions, you will need to fill out order forms. During the game, you will need to fill out six such forms, one for each round. <br/>
                                <br/>
                                The game round will proceed as follows: <br/>
                                <br/>
                                At the beginning of each round, we gather to learn the latest news. Then there will be international debates where you can discuss the news, express your opinion, or make an official statement. After that, teams move to negotiation rooms to discuss game strategy. In the negotiation room, you can send negotiators or a group of negotiators to another country. To do this, you will need to contact the game moderator and inform them of your intentions. One minute before the end of the round, you will see a countdown timer indicating the remaining time within which you must make final decisions and issue orders. <br/>
                                <br/>
                                Good luck in the game!
                                </p>
                                <div className={cl.game_join}>
                                    <Link to="/login">Join the game</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default Home;