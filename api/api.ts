import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export default api;

/* Si se usar emulador
IOS: usa http://localhost:5000/api
ANDROID: usa http://10.0.2.2:5000/api
Fisico:  usa direccion IP local de la pc en la red http://192.168.X.X:5000/api
 */