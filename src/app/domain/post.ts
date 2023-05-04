import { CommentDto } from './comment-dto';
import { PostCategoryDto } from './post-category-dto';
import { UserDto } from './user-dto';

export interface Post {
  id: number;
  title: string;
  content: string;
  userDto?: UserDto;
  likedBy?: UserDto[];
  postCategoryDto?: PostCategoryDto;
  comments?: CommentDto[];
}
