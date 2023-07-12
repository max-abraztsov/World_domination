// For country page (get) request ////////////////////////////////////////////// 
export interface ICity{ // Информация по конкретному городу
    photo: string; // Ссылка на фото
    city_name: string; // Название 
    live_level: number; // Уровень жизни %
    progress: number; // Развитие %
    profit: number;   // Доход %
    shield: boolean;  // Наличие щита
    state: boolean; // Состояние города
}

export interface ICountry{
    country: string; // Название страны
    flag_photo: string; // Ссылка на фото флага
    budget: number; // Бюджет 
    average_live_level: number; // Средний уровень жизни
    nuclear_technology: boolean; // Наличие ядерной программы
    ecology: number;
    rockets: number; // Количество имеющихся бомб
    cities: ICity[]; // Массив всех городов одной страны 
    enemies: IEnemy[];
}

// For general page request /////////////////////////////////////////////
export interface ICountries{
    countries: ICountry[]; // Все страны
}

// For form (post) request //////////////////////////////////////////////
export interface ICityForm{ // Изменения для конкретного города
    city_name: string; // Для ориентирования
    develop: boolean; // Развитие города
    shield: boolean; // Установка щита
}

export interface IEnemyCity{
    city_name: string;
    state: boolean;
}

export interface IEnemy{
    country: string; //
    sanctions: boolean;
    sanctinosFrom: boolean;
    cities: IEnemyCity[]; //
}

export interface IForm{ // Изменения вцелом для страны
    country: string; // Для ориентирования
    nuclear_technology: boolean; // Развитие ядерной программы
    ecology: boolean; // Инвестиция в экологию
    budget: number;
    rocket_order: number;
    rockets: number; // Количество заказанных бомб
    donate: IDonat;
    cities: ICityForm[]; // Массив изменений для городов
    enemies: IEnemy[]; // 
}
// For login page
export interface IStatus { // Статус пользователя
    isPresident: boolean, // Принимает только два значения(false - для юзера, true - для президента и админа)
}

// Public information about countries//////////////////////////////////////////////////////////////////////////////

export interface ICountriesPublicInfo{
    ecology: number;
    countries: ICountryPublicInfo[]; // Все страны
}

export interface ICountryPublicInfo{
    country: string;
    average_live_level: number; // Средний уровень жизни
    cities: ICityPublicInfo[];
}

export interface ICityPublicInfo{
    city_name: string; // Название 
    live_level: number; // Уровень жизни %
    state: boolean;
}

export interface IDonat {
    from: string;
    to: string;
    amount: number;
}