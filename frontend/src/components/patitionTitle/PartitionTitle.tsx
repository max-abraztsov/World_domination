import {FC} from 'react';
import Tooltip from '../UI/tooltip/Tooltip';
import cl from "./PartitionTitle.module.css"

interface PartitionTitleProps{
    title: string;
    text: string;
} 
const PartitionTitle:FC<PartitionTitleProps>  = ({title, text}) => {
    return (
        <div className={cl.partition__title_block}>
            <h3 className={cl.partition__title}>{title}</h3>
            <Tooltip text={text}/>
        </div>
    );
};

export default PartitionTitle;