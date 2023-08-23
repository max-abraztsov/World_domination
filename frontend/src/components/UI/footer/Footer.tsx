import {FC} from 'react';
import {Link} from "react-router-dom"
import cl from "./Footer.module.css"
import { useLocation } from 'react-router-dom';

import logo from "./../../../assets/LOgo.svg"
import instagram from "./../../../assets/instagram-icon.svg"
import facebook from "./../../../assets/facebook-icon.svg"
import discord from "./../../../assets/discord-icon.svg"
import telegram from "./../../../assets/telegram-icon.svg"
import tiktok from "./../../../assets/tiktok-icon.svg"

const Footer: FC = () => {

    const location = useLocation();

    return (
        <footer>
            <div className={cl.container}>
                <div className={cl.footer}>
                    <div className={cl.footer_information}>
                        <div className={cl.footer_logo}>
                            <img src={logo} />
                        </div>
                        {location.pathname !== "/country" && (
                            <ul className={cl.footer_links}>
                                <Link className={cl.footer_link} to="/">Home</Link>
                                <Link className={cl.footer_link} to="/login">Sign in</Link>
                            </ul> 
                        )}
                        <div className={cl.footer_kontakt}>
                            <p><span>Kontakt</span><br/>
                                world.domination@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className={cl.footer_socials}>
                        <a className={cl.footer_social}>
                            <p>@world.domination</p><img src={instagram}/>
                        </a>
                        {/* <a className={cl.footer_social}>
                            <p>@world.domination</p><img src={facebook}/>
                        </a> */}
                        <a className={cl.footer_social}>
                            <p>@world.domination</p><img src={discord}/>
                        </a>
                        <a className={cl.footer_social}>
                            <p>@world.domination</p><img src={telegram}/>
                        </a>
                        {/* <a className={cl.footer_social}>
                            <p>@world.domination</p><img src={tiktok}/>
                        </a> */}
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