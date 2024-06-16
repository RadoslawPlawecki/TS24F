import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';
import {
  CreateBookDTO,
  CreateBookResponseDTO,
  EditBookDTO,
  GetBookDTO,
} from './dto/book.dto';
import {
  CreateRentalDTO,
  CreateRentalResponseDTO,
  GetRentalDTO,
  UpdateRentalDTO,
  UpdateRentalResponseDTO,
} from './dto/rental.dto';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './security/token.payload';
import { GetUserFullDTO } from './dto/user.dto';
import { RegisterDTO, RegisterResponseDTO } from './dto/register.dto';
import {
  CreateReviewDTO,
  CreateReviewResponseDTO,
  EditReviewDTO,
  EditReviewResponseDTO,
  GetReviewDTO,
} from './dto/review.dto';

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

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    );

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

  public async getBookById(
    id: number,
  ): Promise<ClientResponse<GetBookDTO | null>> {
    try {
      const response: AxiosResponse<GetBookDTO> = await this.client.get(
        `book/${id}`,
      );
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

  public async deleteBook(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `book/${id}`,
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

  public async getRentalsByUser(
    id: number,
  ): Promise<ClientResponse<GetRentalDTO | null>> {
    try {
      const response: AxiosResponse<GetRentalDTO> = await this.client.get(
        `rental/get?userId=${id}`,
      );
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

  public async addRental(
    data: CreateRentalDTO,
  ): Promise<ClientResponse<CreateRentalResponseDTO | null>> {
    try {
      const response: AxiosResponse<CreateRentalResponseDTO> =
        await this.client.post('/rental/add', data);
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

  public async getMe(): Promise<ClientResponse<GetUserFullDTO | null>> {
    try {
      const response: AxiosResponse<GetUserFullDTO> =
        await this.client.get('user/get/me');
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
      console.log(data);
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

  public async getReviews(): Promise<ClientResponse<GetReviewDTO | null>> {
    try {
      const response: AxiosResponse<GetReviewDTO> =
        await this.client.get('review/get');
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

  public async getReviewsByUser(
    id: number,
  ): Promise<ClientResponse<GetReviewDTO | null>> {
    try {
      const response: AxiosResponse<GetReviewDTO> = await this.client.get(
        `review/get?userId=${id}`,
      );
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

  public async getReviewsByBook(
    id: number,
  ): Promise<ClientResponse<GetReviewDTO | null>> {
    try {
      const response: AxiosResponse<GetReviewDTO> = await this.client.get(
        `review/get?bookId=${id}`,
      );
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

  public async addReview(
    data: CreateReviewDTO,
  ): Promise<ClientResponse<CreateReviewResponseDTO | null>> {
    try {
      const response: AxiosResponse<CreateReviewResponseDTO> =
        await this.client.post('/review/add', data);
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

  public async deleteReview(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `review/${id}`,
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

  public async editReview(
    data: EditReviewDTO,
  ): Promise<ClientResponse<EditReviewResponseDTO | null>> {
    try {
      console.log(data);
      const response: AxiosResponse<EditReviewResponseDTO> =
        await this.client.patch('review/edit', data);
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

  public async editBook(
    data: EditBookDTO,
  ): Promise<ClientResponse<GetBookDTO | null>> {
    try {
      console.log(data);
      const response: AxiosResponse<GetBookDTO> = await this.client.patch(
        'book/edit',
        data,
      );
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
}
