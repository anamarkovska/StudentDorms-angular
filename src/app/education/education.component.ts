import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post-service';
import { PostCreationDto } from '../domain/post-creation-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../domain/post';
import { CommentService } from '../comment.service';
import { CommentDto } from '../domain/comment-dto';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { UserDto } from '../domain/user-dto';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  postForm: FormGroup;
  categoryId: number | undefined;
  posts: Post[] = [];
  commentForm: FormGroup;
  showCommentsMap: { [postId: number]: boolean } = {};
  likeCount!: number;
  likedUsernames: String[]=[]
  showLikesModal=false;
  likedPosts: number[] = [];
  likeCounts: { [postId: number]: number } = {};
  isLiked: { [postId: number]: boolean } = {};
  authenticatedUser : UserDto | undefined;
  notAuthorized = false;


  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private commentService: CommentService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('id')!;
       Promise.all([this.getPostsByCategory()])
    });
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.authenticatedUser = user;
    });
  }

  onSubmit(): void {
    const post: PostCreationDto = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
    };
    console.log(this.categoryId);
    if (this.categoryId) {
      this.postService.createPost(post, this.categoryId).subscribe(
        () => {
          // Handle success
          console.log('Post created!');
          this.getPostsByCategory();
          this.postForm.reset();
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
    } else {
      console.error('Category ID is undefined');
    }
  }



  comment(postId: number) {
    const comment = this.commentForm.value;
    this.commentService.addComment(postId, comment).subscribe(
      (newComment) => {
        console.log('Comment added:', newComment);
        this.commentForm.reset();
        this.showCommentsMap[postId] = true;

        // Fetch new comments for the post from the server
        this.commentService.getCommentsByPostId(postId).subscribe(
          (comments) => {
            const index = this.posts.findIndex(post => post.id === postId);
            if (index > -1) {
              this.posts[index].comments = comments;
            }
          },
          (error) => {
            console.error('Failed to fetch comments:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to add comment:', error);
      }
    );
  }



  getPostsByCategory(): void {
    this.postService.getPostsByCategory(this.categoryId!!).subscribe((items: Post[]) => {
      this.posts = items;
      this.posts = this.posts.reverse();
      this.posts.forEach(post => {
        this.loadLikeCount(post.id);
        this.getLikedUsernames(post.id);
        this.showCommentsMap[post.id] = false;
        this.postService
        .hasLikedPost(post.id)
        .subscribe((isLiked: boolean) => {
          this.isLiked[post.id] = isLiked;
        });
      });
    });
  }


  // loadLikeCount(postId:number) {
  //   this.postService.getNumberOfLikes(postId).subscribe((count) => {
  //     this.likeCount = count;
  //   });
  // }

  getLikedUsernames(postId: number) {
    this.postService.getUsernamesFromPostLikes(postId).subscribe(usernames => {
      this.likedUsernames = usernames;
    });
  }

  showLikes(postId: number) {
    this.postService.getUsernamesFromPostLikes(postId).subscribe((usernames) => {
      this.likedUsernames= usernames;
      this.showLikesModal = true;
    });
  }


  closeLikesModal() {
    this.showLikesModal = false;
    this.likedUsernames = [];
  }


  onLike(postId: number) {
    const index = this.likedPosts.findIndex(post => post === postId);
    const isLiked = this.isLiked[postId] || false;

    if (isLiked) {
      this.postService.deleteLike(postId).subscribe(() => {
        this.likedPosts.splice(index, 1);
        this.loadLikeCount(postId);
        this.getLikedUsernames(postId);
        this.isLiked[postId] = false;
      });
    } else {
      this.postService.createLike(postId).subscribe(() => {
        this.likedPosts.push(postId);
        this.loadLikeCount(postId);
        this.getLikedUsernames(postId);
        this.isLiked[postId] = true;
      });
    }
  }



  isPostLiked(postId: number): boolean {
    return (
      this.likedPosts.indexOf(postId) !== -1 || this.isLiked[postId] === true
    );
  }

  getLikesForAllPosts(): void {
    this.posts.forEach(post => {
      this.postService.getNumberOfLikes(post.id).subscribe(count => {
        this.likeCount = count;
      });
    });
  }

  loadLikeCount(postId:number) {
    this.postService.getNumberOfLikes(postId).subscribe((count) => {
      this.likeCounts[postId] = count;
    });
  }


  deleteComment(commentId: number, postId: number): void {
    this.commentService.deleteComment(commentId).subscribe(
      response => {
        console.log('Comment deleted successfully!');
        // Remove the deleted comment from the post comments array
        const post = this.posts.find(p => p.id === postId);
        const deletedCommentIndex = post!!.comments.findIndex(c => c.id === commentId);
        if (deletedCommentIndex > -1) {
          post!!.comments.splice(deletedCommentIndex, 1);
        }
        // Set the showCommentsMap to true for the post
        this.showCommentsMap[postId] = true;
      },
      error => {
        console.error('Error deleting comment:', error);
      }
    );
  }
  

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      response => {
        // handle success response
        console.log('Post deleted successfully!');
        // Refresh the posts after deleting the post
        this.getPostsByCategory();
      },
      error => {
        // handle error response
        console.error('Error deleting post:', error);
      }
    );
  }



}



