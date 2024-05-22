import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';

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
  }

  public async login(
    data: LoginDTO,
  ): Promise<ClientResponse<LoginResponseDTO | null>> {
    try {
      const response: AxiosResponse<LoginResponseDTO> = await this.client.post(
        '/auth/login',
        data,
      );

      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;

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
