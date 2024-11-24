import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const auth = async (login: string, password: string) => {
  try {
    const response = await api.post('api/auth/login', {
      email: login,
      password: password
    });
    console.log(response.data);
    // Сохраняем токен в localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Удаляем токен из localStorage
      localStorage.removeItem('token');
      // Перенаправляем пользователя на страницу логина
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export const getProtected = async () => {
  try {
    const response = await api.get('api/auth/protected');
    return response.data;
  } catch (error) {
    console.error(error);
    // throw error
  }
};

export const fetchOs = async () => {
  try {
    const response = await api.get('api/os');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReservation = async (begin: string, end: string, description: string, os_id: number) => {
  try {
    const response = await api.post('api/reservation', {
      begin,
      end,
      description,
      os_id
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const activeSession = async () => {
  try {
    const response = await api.get('api/access');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
