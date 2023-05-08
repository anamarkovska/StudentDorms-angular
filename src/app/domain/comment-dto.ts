import { UserDto } from "./user-dto";

export interface CommentDto {
  id: number;
  content: string;
  userDto?: UserDto;
}
