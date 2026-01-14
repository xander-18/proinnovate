const isDevelopment = __DEV__; // Expo/React Native detecta esto automáticamente

// IP local de tu Mac (cámbiala si tu IP cambia)
const LOCAL_IP = '192.168.1.132';

// URLs según el entorno
export const API_HOST = isDevelopment 
  // ? `http://${LOCAL_IP}:8000`  // Desarrollo local
  ? `http://${LOCAL_IP}:3000`  // Desarrollo local
  : 'https://blacksoccer.blackhouse.com'; 
  
// export const API_HOST = 'https://blacksoccer.blackhouse.com';


export const API_URL = API_HOST + '/api/users';

export const API_URL_LOGIN = API_URL + '/login';
export const API_URL_REGISTER = API_URL + '/register';

console.log('API ready a:', API_HOST);
