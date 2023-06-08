class AppConfig {
    VACATIONS_URL = 'http://localhost:4000/api/vacations/';
    LIKES_URL= 'http://localhost:4000/api/likes/';
    LIKES_COUNT_URL= 'http://localhost:4000/api/likes/count';
    REGISTER_URL='http://localhost:4000/api/register';
    LOGIN_URL='http://localhost:4000/api/login';
}

const config = new AppConfig(); 
export default config;