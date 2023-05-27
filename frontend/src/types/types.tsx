// For country page (get) request ////////////////////////////////////////////// 
export interface ICity{ // Информация по конкретному городу
    photo: string; // Ссылка на фото
    city__name: string; // Название 
    live__level: number; // Уровень жизни %
    progress: number; // Развитие %
    profit: number;   // Доход %
    shield: boolean;  // Наличие щита
}

export interface ICountry{
    country: string; // Название страны
    flag__photo: string; // Ссылка на фото флага
    budget: number; // Бюджет 
    average__live__level: number; // Средний уровень жизни
    nuclear__program: boolean; // Наличие ядерной программы
    bomb: number; // Количество имеющихся бомб
    cities: ICity[]; // Массив всех городов одной страны 
}

// For general page request /////////////////////////////////////////////
export interface ICountries{
    countries: ICountry[]; // Все страны
}

// For form (post) request //////////////////////////////////////////////
export interface ICityForm{ // Изменения для конкретного города
    city__name: string; // Для ориентирования
    develop: boolean; // Развитие города
    shield: boolean; // Установка щита
}

export interface IForm{ // Изменения вцелом для страны
    country: string; // Для ориентирования
    nuclear__program: boolean; // Развитие ядерной программы
    ecology: boolean; // Инвестиция в экологию
    bomb: number; // Количество заказанных бомб
    donat: number; // Донат другим странам
    cities: ICityForm[]; // Массив изменений для городов
}