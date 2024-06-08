import axios from 'axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface User {
  id: string;
  email: string;
  userName: string;
  imageUrl: string;
}

const axiosInstance = axios.create({
  baseURL: 'https://career-path-djole-cc1105963d96.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      `/api/user/login`,
      credentials,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to login');
    }
    throw new Error('Failed to login');
  }
};

export const listUsers = async (): Promise<User[]> => {
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
