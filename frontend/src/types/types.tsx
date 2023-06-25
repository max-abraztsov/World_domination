// For country page (get) request ////////////////////////////////////////////// 
export interface ICity{ // Информация по конкретному городу
    photo: string; // Ссылка на фото
    city__name: string; // Название 
    live__level: number; // Уровень жизни %
    progress: number; // Развитие %
    profit: number;   // Доход %
    shield: boolean;  // Наличие щита
    state: boolean; // Состояние города
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

export interface IEnemyCity{
    city__name: string;
    city__state: boolean;
}

export interface IEnemy{
    country: string; //
    cities: IEnemyCity[]; //
}

export interface IForm{ // Изменения вцелом для страны
    country: string; // Для ориентирования
    nuclear__program: boolean; // Развитие ядерной программы
    ecology: boolean; // Инвестиция в экологию
    budget: number;
    bomb: number; // Количество заказанных бомб
    donat: number; // Донат другим странам
    cities: ICityForm[]; // Массив изменений для городов
    enemies: IEnemy[]; // 
}
// For login page
export interface IStatus { // Статус пользователя
    isPresident: boolean, // Принимает только два значения(false - для юзера, true - для президента и админа)
}

// Public information about countries//////////////////////////////////////////////////////////////////////////////

export interface ICountriesPublicInfo{
    countries: ICountryPublicInfo[]; // Все страны
}

export interface ICountryPublicInfo{
    country: string;
    average__live__level: number; // Средний уровень жизни
    cities: ICityPublicInfo[];
}

export interface ICityPublicInfo{
    city__name: string; // Название 
    live__level: number; // Уровень жизни %
    city__state: boolean;
}