import {FC} from 'react';
import cl from "./Page404.module.css"

const Page404: FC = () => {
    return (
        <div className={cl.nomatch}>
            <h1 className={cl.nomatch__error}>404</h1>
            <div>
                <h2 className={cl.nomatch__message}>Uuups...</h2>
                <h2 className={cl.nomatch__message}>Page not found!</h2>
            </div>  
        </div>
    );
};

export default Page404;