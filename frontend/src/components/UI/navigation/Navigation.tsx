import {FC, useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import cl from "./Navigation.module.css"

const Navigation: FC = () => {

    const [scrollOpacity, setScrollOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight * 1.1;
            const scrollPosition = window.pageYOffset;

            const opacity = scrollPosition / windowHeight;
            setScrollOpacity(opacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <nav className={cl.navigation}
        style={{ backgroundColor: `rgba(20, 22, 68, ${scrollOpacity})` }}>
            <ul className={cl.navigation__links}>
                <Link className={cl.navigation__link} to="/">Home</Link>
                <Link className={cl.navigation__link} to="/country">Your country</Link>
                <Link className={cl.navigation__link} to="/login">Sign in</Link>
                {/* <Link className={cl.navigation__link} to="/wd-admin">Admin</Link> */}
            </ul>
        </nav>
    );
};

export default Navigation;