export interface UserDTO {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponse extends UserDTO {}
