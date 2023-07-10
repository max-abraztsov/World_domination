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
                <h2 className={cl.login__title}>Sign in</h2>
                <div className={cl.login__container}>
                    <label className={cl.login__label}>Login</label>
                    <input 
                        className={cl.login__input}
                        onChange={changeLogin} 
                        type="text" 
                        value={userForm.logincode} 
                        placeholder="Enter your login" 
                        name="ulogin" 
                        required 
                    />

                    <label className={cl.login__label}>Password</label>
                    <input 
                        className={cl.login__input}
                        onChange={changePassword} 
                        type="text" 
                        value={userForm.password} 
                        placeholder="Enter your password" 
                        name="upassword" 
                        required 
                    />

                    <button 
                        className={cl.login__button}
                        type="submit" 
                        // onClick={clickHandler}
                    >Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;