export interface UserDTO {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  teamId: string;
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

export interface SendResetPasswordEmailRequest {
  email: string;
  redirectUrl: string;
}

export interface ResetPasswordRequest {
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface DefaultResponse {
  message: string;
}
