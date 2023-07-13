import React, {FormEvent, useState, FC} from 'react';
import cl from "./Login.module.css" ;
import axios from 'axios';
import { useAppDispatch } from '../../hook';
import { loginUser } from '../../store/auth/actionCreators';

interface UserProps {
    logincode: string;
    password: string; 
}

const Login: FC = () => {
    const [userForm, setUserForm] = useState<UserProps>({
        logincode: "",
        password: "",
    });

    const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm, logincode: e.target.value});
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm, password: e.target.value});
    }

    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(userForm));
    }

    // const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     postLogin();
    //     setUserForm({logincode: "", password: "",});
    // }

    // async function postLogin(){
    //     try{
    //         console.log(userForm);
    //         const response = await axios.post("http://127.0.0.1:8000/login_page", userForm);
    //         console.log(response.data);
    //         return response;
    //     }catch (error){
    //         if (axios.isAxiosError(error)) {
    //             console.log('error message: ', error.message);
    //             return error.message;
    //         } else {
    //             console.log('unexpected error: ', error);
    //             return 'An unexpected error occurred';
    //         }
    //     }
    // }

    return (
        <div className={cl.login__wrapper}>    
            <form className={cl.login__form} onSubmit={handleSubmit} method="post">
                <h2 className={cl.login__title}>Login</h2>
                <p className={cl.login__text}>Login to continue using the app</p>
                <div className={cl.login__container}>
                    <div className={cl.form_control}>
                        <input 
                            className={cl.login__input}
                            onChange={changeLogin} 
                            type="text" 
                            value={userForm.logincode}  
                            name="ulogin" 
                            required 
                        />
                        <label className={cl.login__label}>
                            <span style={{transitionDelay: "0ms"}}>U</span>
                            <span style={{transitionDelay: "50ms"}}>s</span>
                            <span style={{transitionDelay: "100ms"}}>e</span>
                            <span style={{transitionDelay: "150ms"}}>r</span>
                            <span style={{transitionDelay: "200ms"}}>n</span>
                            <span style={{transitionDelay: "250ms"}}>a</span>
                            <span style={{transitionDelay: "300ms"}}>m</span>
                            <span style={{transitionDelay: "350ms"}}>e</span>
                        </label>
                    </div>

                    <div className={cl.form_control}>
                        <input 
                            className={cl.login__input}
                            onChange={changePassword} 
                            type="text" 
                            value={userForm.password} 
                            name="upassword" 
                            required 
                        />
                        <label className={cl.login__label}>
                            <span style={{transitionDelay: "0ms"}}>P</span>
                            <span style={{transitionDelay: "50ms"}}>a</span>
                            <span style={{transitionDelay: "100ms"}}>s</span>
                            <span style={{transitionDelay: "150ms"}}>s</span>
                            <span style={{transitionDelay: "200ms"}}>w</span>
                            <span style={{transitionDelay: "250ms"}}>o</span>
                            <span style={{transitionDelay: "300ms"}}>r</span>
                            <span style={{transitionDelay: "350ms"}}>d</span>
                        </label>
                    </div>

                    <button type="submit">
                        Login
                        <div className={cl.arrow_wrapper}>
                            <div className={cl.arrow}></div>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;