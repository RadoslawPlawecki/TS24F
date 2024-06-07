export class RegisterDTO {
  name: string | undefined;
  username: string | undefined;
  password: string | undefined;
  role: string | undefined;
  email: string | undefined;
}

export class RegisterResponseDTO {
  username: string | undefined;
  role: string | undefined;
}
