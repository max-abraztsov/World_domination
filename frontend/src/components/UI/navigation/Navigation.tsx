import {FC} from 'react';
import {Link} from "react-router-dom"
import cl from "./Navigation.module.css"

const Navigation: FC = () => {
    return (
        <nav className={cl.navigation}>
            <ul className={cl.navigation__links}>
                <Link className={cl.navigation__link} to="/">Home</Link>
                <Link className={cl.navigation__link} to="/country">Your country</Link>
                <Link className={cl.navigation__link} to="/login">Sign in</Link>
            </ul>
        </nav>
    );
};

export default Navigation;