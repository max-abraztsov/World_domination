import {FC, useState} from 'react';
import { ICountry, IForm  } from '../../types/types';

const Country: FC = () => {

    const [isPresident, setIsPresident] = useState(true);
    
    const [country, setCountry] = useState<ICountry>({
        country: "Belarus",
        flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
        budget: 1000,
        average__live__level: 57,
        nuclear__program: true,
        bomb: 2,
        cities: [
            {
                photo: "https://www.sb.by/upload/medialibrary/1a7/1a727cda80dc698264b839a7ff704fa8.jpg",
                city__name: "Minsk",
                live__level: 56,
                progress: 90,
                profit: 270,  
                shield: true,  
            },
            {
                photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                city__name: "Homel",
                live__level: 57,
                progress: 60,
                profit: 180,  
                shield: undefined,
            },
            {
                photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/fb/ce/ff/caption.jpg?w=700&h=500&s=1",
                city__name: "Grodno",
                live__level: 57,
                progress: 50,
                profit: 170,  
                shield: undefined,
            },
            {
                photo: "https://www.vsedostoprimechatelnosti.ru/assets/cache/images/evropa/belorussiya/brest/brest-880x-770.jpg",
                city__name: "Brest",
                live__level: 58,
                progress: 50,
                profit: 160,  
                shield: true,
            },
        ]
    });

    const [formResult, setFormResult] = useState<IForm>({
        country: "Belarus",
        nuclear__program: false,
        ecology: false,
        bomb: 0,
        donat: 0,
        cities: [
            {
                city__name: "Minsk",
                develop: false,
                shield: false,
            },
            {
                city__name: "Homel",
                develop: false,
                shield: false,
            },
            {
                city__name: "Grodno",
                develop: false,
                shield: false,
            },
            {
                city__name: "Brest",
                develop: false,
                shield: false,
            },
        ],
    });

    return (
        <div>
            Your country
        </div>
    );
};

export default Country;