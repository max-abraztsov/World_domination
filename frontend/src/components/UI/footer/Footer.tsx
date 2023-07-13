import {FC} from 'react';
import {Link} from "react-router-dom"
import cl from "./Footer.module.css"

import logo from "./../../../assets/LOgo.svg"
import instagram from "./../../../assets/instagram-icon.svg"
import facebook from "./../../../assets/facebook-icon.svg"
import discord from "./../../../assets/discord-icon.svg"
import telegram from "./../../../assets/telegram-icon.svg"
import tiktok from "./../../../assets/tiktok-icon.svg"

const Footer: FC = () => {
    return (
        <footer>
            <div className={cl.container}>
                <div className={cl.footer}>
                    <div className={cl.footer_information}>
                        <div className={cl.footer_logo}>
                            <img src={logo} />
                        </div>
                        <ul className={cl.footer_links}>
                            <Link className={cl.footer_link} to="/">Home</Link>
                            <Link className={cl.footer_link} to="/country">Your country</Link>
                            <Link className={cl.footer_link} to="/login">Sign in</Link>
                            <Link className={cl.footer_link} to="/wd-admin">Admin</Link>
                        </ul> 
                        <div className={cl.footer_kontakt}>
                            <p><span>Kontakt</span><br/>
                                world.domination@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className={cl.footer_socials}>
                        <div className={cl.footer_social}>
                            <p>@world.domination</p><img src={instagram}/>
                        </div>
                        <div className={cl.footer_social}>
                            <p>@world.domination</p><img src={facebook}/>
                        </div>
                        <div className={cl.footer_social}>
                            <p>@world.domination</p><img src={discord}/>
                        </div>
                        <div className={cl.footer_social}>
                            <p>@world.domination</p><img src={telegram}/>
                        </div>
                        <div className={cl.footer_social}>
                            <p>@world.domination</p><img src={tiktok}/>
                        </div>
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