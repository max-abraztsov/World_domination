import {FC, useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import { useAppSelector, useAppDispatch } from './../../../hook';
import { toggleLogged } from '../../../store/loginSlice';
import cl from "./Navigation.module.css"
import { useNavigate, useLocation } from 'react-router-dom';
import Logout from '../logout/Logout';



const Navigation: FC = () => {

    const login = useAppSelector(state => state.status);
    const country = useAppSelector(state => state.country);
    const form = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(country, form);
        if (localStorage.getItem("authenticated") === "true"){
            dispatch(toggleLogged({status: true}));
        } else if (localStorage.getItem("authenticated") === null || localStorage.getItem("authenticated") === "false" && location.pathname === "/country"){
            navigate("/");
            dispatch(toggleLogged({status: false}));
            localStorage.setItem("authenticated", "false");
            if (location.pathname === "/country") {
                navigate("/login");
            }
        } else {
            console.log("Error");
        }
      }, []);

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
                {login.is_logged_in ? (
                    <div className={cl.navigation__links}>
                        <Link className={cl.navigation__link} to="/"><Logout /></Link>
                    </div>
                ) : (
                    <div className={cl.navigation__links}>
                        <Link className={cl.navigation__link} to="/">Home</Link>
                        <Link className={cl.navigation__link} to="/login">Sign in</Link>
                    </div>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;