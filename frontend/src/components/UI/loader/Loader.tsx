import React, { FC } from 'react';
import cl from "./Loader.module.css"

interface ILoader{
    text: string;
}

const Loader: FC<ILoader> = ({text}) => {
    return (
        <div className={cl.country}>
            <div className={cl.container}>
                <div className={cl.country__table_loading}>
                    <div className={cl.loader}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={cl.loader__text}>
                        {text}<br/>
                        Please don't reload the page!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
