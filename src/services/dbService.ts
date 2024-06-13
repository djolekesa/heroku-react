import axios from 'axios';

export interface AuthCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: string;
  email: string;
  userName: string;
  imageUrl: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  },
);
export const login = async (
  credentials: AuthCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      `/api/login`,
      credentials,
    );
    localStorage.setItem('accessToken', response.data as unknown as string);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to login');
    }
    throw new Error('Failed to login');
  }
};

export const register = async (credentials: AuthCredentials): Promise<void> => {
  try {
    await axiosInstance.post<void>(`/api/user/register`, credentials);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to register');
    }
    throw new Error('Failed to register');
  }
};

export const listUsers = async (): Promise<User[]> => {
  console.log('TOKEN: ', localStorage.getItem('token'));
  const response = await axiosInstance.get(`/api/user/list`);
  console.log('listed userssss: ', response);
  return response.data;
};

export const updateImage = async (
  imageUrl: string,
  email: string,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.put<LoginResponse>(
      `/api/user/update`,
      {
        imageUrl,
        email,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to login');
    }
    throw new Error('Failed to update image');
  }
};
