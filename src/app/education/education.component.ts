import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post-service';
import { PostCreationDto } from '../domain/post-creation-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../domain/post';
import { CommentService } from '../comment.service';
import { UserService } from '../user.service';
import { UserDto } from '../domain/user-dto';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { CommentDto } from '../domain/comment-dto';

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
  commentEditForm: FormGroup;
  showCommentsMap: { [postId: number]: boolean } = {};
  likeCount!: number;
  likedUsernames: String[] = []
  showLikesModal = false;
  likedPosts: number[] = [];
  likeCounts: { [postId: number]: number } = {};
  isLiked: { [postId: number]: boolean } = {};
  authenticatedUser: UserDto | undefined;
  notAuthorized = false;
  showPostForm = false;
  editedPostTitle: string | undefined;
  editedPostContent: string | undefined;
  postId: number | undefined;
  showEditModal: boolean = false;
  editModeMap: { [commentId: number]: boolean } = {};
  isAdmin: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.commentEditForm = this.formBuilder.group({
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
    this.initializeEditMode();
  }
  saveComment(commentId: number, postId: number): void {
    const editedComment = this.commentEditForm.value;
    editedComment.id = commentId;

    this.commentService.updateComment(editedComment).subscribe(
      (updatedComment: CommentDto) => {
        // Update the comment in the comments array or perform any necessary actions
        // Reset the edit mode for the comment
        this.editModeMap[commentId] = false;
        this.commentEditForm.reset();
        console.log('Comment updated successfully:', updatedComment);

        // Fetch updated comments for the specific post
        this.commentService.getCommentsByPostId(postId).subscribe(
          (comments: CommentDto[]) => {

            const postIndex = this.posts.findIndex(post => post.id === postId);
            if (postIndex > -1) {
              this.posts[postIndex].comments = comments;
            }
          },
          (error: any) => {
            console.log('Error fetching comments:', error);
          }
        );
      },
      (error: any) => {
        console.log('Error updating comment:', error);
      }
    );
  }

  cancelEdit(commentId: number): void {
    this.editModeMap[commentId] = false;
    this.commentEditForm.reset();
  }

  editComment(comment: CommentDto): void {
    this.editModeMap[comment.id] = true; // Set editMode to true for the specific comment ID// Assign the comment to a class property for reference
    this.commentEditForm.patchValue({ content: comment.content }); // Update the form with the comment's content
  }
  initializeEditMode(): void {
    this.commentService.getAllComments().subscribe(
      (comments: CommentDto[]) => {
        comments.forEach((comment) => {
          this.editModeMap[comment.id] = false; // Set initial editMode to false for each comment
        });
      },
      (error: any) => {
        console.log('Error fetching comments:', error);
      }
    );
  }
  // onSubmit(): void {
  //   const post: PostCreationDto = {
  //     title: this.postForm.value.title,
  //     content: this.postForm.value.content,
  //   };
  //   console.log(this.categoryId);
  //   if (this.categoryId) {
  //     this.postService.createPost(post, this.categoryId).subscribe(
  //       () => {
  //         console.log('Post created!');
  //         this.getPostsByCategory();
  //         this.postForm.reset();
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     console.error('Category ID is undefined');
  //   }
  // }

  onSubmit(): void {
    const post: PostCreationDto = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
    };
    console.log(this.categoryId);
    if (this.categoryId) {
      this.postService.createPost(post, this.categoryId).subscribe(
        () => {
          console.log('Post created!');
          this.getPostsByCategory();
          this.postForm.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Category ID is undefined');
    }
  }

  closeEditModal() {
    const modalElement = document.getElementById('editPostModal');
    const backdropElement = document.getElementsByClassName('modal-backdrop')[0];
    if (modalElement && backdropElement) {
      modalElement.classList.remove('show');
      backdropElement.classList.remove('show');
      setTimeout(() => {
        this.showEditModal = false;
        modalElement.style.display = 'none';
        backdropElement.remove();
      }, 10); // Adjust the timeout duration to match the animation duration
    }
  }




  openEditModal(post: any) {
    this.showEditModal = true;
    this.editedPostTitle = post.title;
    this.editedPostContent = post.content;
    this.postId = post.id;

    setTimeout(() => {
      const editModal = document.getElementById('editPostModal');
      if (editModal) {
        editModal.classList.add('show');
      }
    }, 0);
  }


  updatePost(): void {
    this.postService.updatePost(this.postId!!, this.editedPostTitle!!, this.editedPostContent!!).subscribe(
      (post: any) => {
        console.log('Post updated successfully:', post);
        // Update the post in the component
        const index = this.posts.findIndex(p => p.id === post.id);
        // if (index > -1) {
        //   this.posts[index] = post;
        // }
        window.location.reload()
        this.closeEditModal()
      },
      (error: any) => {
        console.log('Error updating post:', error);
      }
    );
  }


  comment(postId: number) {
    const comment = this.commentForm.value;
    this.commentService.addComment(postId, comment).subscribe(
      (newComment) => {
        console.log('Comment added:', newComment);
        this.commentForm.reset();
        this.showCommentsMap[postId] = true;
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
      this.posts = items.reverse();
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

  getLikedUsernames(postId: number) {
    this.postService.getUsernamesFromPostLikes(postId).subscribe(usernames => {
      this.likedUsernames = usernames;
    });
  }

  showLikes(postId: number) {
    this.postService.getUsernamesFromPostLikes(postId).subscribe((usernames) => {
      this.likedUsernames = usernames;
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

  loadLikeCount(postId: number) {
    this.postService.getNumberOfLikes(postId).subscribe((count) => {
      this.likeCounts[postId] = count;
    });
  }


  deleteComment(commentId: number, postId: number): void {
    this.commentService.deleteComment(commentId).subscribe(
      response => {
        console.log('Comment deleted successfully!');
        const post = this.posts.find(p => p.id === postId);
        const deletedCommentIndex = post!!.comments.findIndex(c => c.id === commentId);
        if (deletedCommentIndex > -1) {
          post!!.comments.splice(deletedCommentIndex, 1);
        }
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
        console.log('Post deleted successfully!');
        this.getPostsByCategory();
      },
      error => {
        console.error('Error deleting post:', error);
      }
    );
  }

  openPostForm(): void {
    this.showPostForm = true;
  }

  closePostForm(): void {
    this.showPostForm = false;
  }



}



