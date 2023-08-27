import {FC} from 'react';
import {Link} from "react-router-dom"
import cl from "./Footer.module.css"
import { useLocation } from 'react-router-dom';

import logo from "./../../../assets/LOgo.svg"
import instagram from "./../../../assets/instagram-icon.svg"
import discord from "./../../../assets/discord-icon.svg"
import telegram from "./../../../assets/telegram-icon.svg"


const Footer: FC = () => {

    const location = useLocation();

    return (
        <footer>
            <div className={cl.container}>
                <div className={cl.footer}>
                    <div className={cl.footer_information}>
                        <div className={cl.footer_logo}>
                            <img src={logo} width="42" height="44" alt="footer logo"/>
                        </div>
                        {location.pathname !== "/country" && (
                            <ul className={cl.footer_links}>
                                <Link className={cl.footer_link} to="/">Home</Link>
                                <Link className={cl.footer_link} to="/login">Sign in</Link>
                            </ul> 
                        )}
                        <div className={cl.footer_kontakt}>
                            <p><span className={cl.kontakt_title}>Kontakt</span><br/>
                                <span className={cl.kontakt_text}>
                                    world.game.domination.2023@gmail.com
                                </span>          
                            </p>
                        </div>
                    </div>
                    <div className={cl.footer_socials}>
                        <a href="https://www.instagram.com/" className={cl.footer_social}>
                            <p>@world.domination</p><img width="25" height="25" src={instagram} alt="instagram icon"/>
                        </a>
                        <a href="https://discord.com/" className={cl.footer_social}>
                            <p>@world.domination</p><img width="25" height="25" src={discord} alt="discord icon"/>
                        </a>
                        <a href="https://telegram.org/" className={cl.footer_social}>
                            <p>@world.domination</p><img width="25" height="25" src={telegram} alt="telegram icon"/>
                        </a>
                    </div>
                </div>
                <div className={cl.copyright}>
                    <p>Copyright 2023 © World domination</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;