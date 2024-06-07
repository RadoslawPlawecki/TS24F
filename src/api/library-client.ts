import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';
import {
  CreateBookDTO,
  CreateBookResponseDTO,
  GetBookDTO,
} from './dto/book.dto';
import {
  GetRentalDTO,
  UpdateRentalDTO,
  UpdateRentalResponseDTO,
} from './dto/rental.dto';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './security/token.payload';
import { GetUserFullDTO } from './dto/user.dto';
import { RegisterDTO, RegisterResponseDTO } from './dto/register.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081',
    });

    const token = localStorage.getItem('authToken'); // get a token if a page is reloaded
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  public async login(
    data: LoginDTO,
  ): Promise<ClientResponse<LoginResponseDTO | null>> {
    try {
      const response: AxiosResponse<LoginResponseDTO> = await this.client.post(
        '/auth/login',
        data,
      );
      const token = response.data.token;
      if (typeof token === 'string') {
        localStorage.setItem('authToken', token); // store a token in case a page is reloaded
      }
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (token) {
        try {
          const decoded: TokenPayload = jwtDecode<TokenPayload>(token);
          localStorage.setItem('userRole', decoded.role as string);
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }

  public async addBook(
    data: CreateBookDTO,
  ): Promise<ClientResponse<CreateBookResponseDTO | null>> {
    try {
      const response: AxiosResponse<CreateBookResponseDTO> =
        await this.client.post('/book/add', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }

  public async registerUser(
    data: RegisterDTO,
  ): Promise<ClientResponse<RegisterResponseDTO | null>> {
    try {
      const response: AxiosResponse<RegisterResponseDTO> =
        await this.client.post('/auth/register', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }

  public async getBooks(): Promise<ClientResponse<GetBookDTO | null>> {
    try {
      const response: AxiosResponse<GetBookDTO> =
        await this.client.get('book/get');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }

  public async getRentals(): Promise<ClientResponse<GetRentalDTO | null>> {
    try {
      const response: AxiosResponse<GetRentalDTO> =
        await this.client.get('rental/get');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }

  public async getUsers(): Promise<ClientResponse<GetUserFullDTO | null>> {
    try {
      const response: AxiosResponse<GetUserFullDTO> =
        await this.client.get('user/get');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }

  public async updateRental(
    data: UpdateRentalDTO,
  ): Promise<ClientResponse<UpdateRentalResponseDTO | null>> {
    try {
      const response: AxiosResponse<UpdateRentalResponseDTO> =
        await this.client.patch('rental/update', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `user/${id}`,
      );
      return {
        success: true,
        data: null,
        statusCode: response.status,
      };
    } catch (error) {
      const AxiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: AxiosError.response?.status || 0,
      };
    }
  }
}
