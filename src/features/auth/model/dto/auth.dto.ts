export interface UserDTO {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface SignInRequestDTO {
  email: string;
  password: string;
}

export interface SignUpRequestDTO {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponseDTO extends UserDTO {}
