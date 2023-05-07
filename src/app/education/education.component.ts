// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PostService } from '../post-service';
// import { PostCreationDto } from '../domain/post-creation-dto';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Post } from '../domain/post';
// import { CommentService } from '../comment.service';
// import { CommentDto } from '../domain/comment-dto';

// @Component({
//   selector: 'app-education',
//   templateUrl: './education.component.html',
//   styleUrls: ['./education.component.css']
// })
// export class EducationComponent implements OnInit {
//   postForm: FormGroup;
//   categoryId: number | undefined;
//   posts: Post[] = [];
//   commentForm: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private postService: PostService,
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private commentService: CommentService,
//     private router: Router
//   ) {
//     this.postForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       content: ['', Validators.required]
//     });
//     this.commentForm = this.formBuilder.group({
//       content: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.postForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       content: ['', Validators.required]
//     });
//     this.commentForm = this.formBuilder.group({
//       content: ['', Validators.required]
//     });
//     this.route.paramMap.subscribe(params => {
//       this.categoryId = +params.get('id')!;
//     });
//     this.getPostsByCategory()
//   }

//   onSubmit(): void {
//     const post: PostCreationDto = {
//       title: this.postForm.value.title,
//       content: this.postForm.value.content,
//     };
//     console.log(this.categoryId);
//     if (this.categoryId) {
//       this.postService.createPost(post, this.categoryId).subscribe(
//         () => {
//           // Handle success
//           console.log('Post created!');
//         },
//         (error) => {
//           // Handle error
//           console.error(error);
//         }
//       );
//     } else {
//       console.error('Category ID is undefined');
//     }
//   }


//   comment(postId:number) {
//     const comment = this.commentForm.value;
//     this.commentService.addComment(postId, comment).subscribe(
//       (newComment) => {
//         console.log('Comment added:', newComment);
//         this.commentForm.reset();
//         this.router.navigate(['/education/2']);
//       },
//       (error) => {
//         console.error('Failed to add comment:', error);
//         // Handle the error, such as displaying an error message
//       }
//     );
//   }

//   getPostsByCategory():void{
//     this.postService.getPostsByCategory(this.categoryId!!)
//       .subscribe((items: Post[]) => {
//         this.posts = items;
//       });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post-service';
import { PostCreationDto } from '../domain/post-creation-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../domain/post';
import { CommentService } from '../comment.service';
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
  showComments = false;


  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private commentService: CommentService,
    private router: Router
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
      this.getPostsByCategory();
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
        this.router.navigate(['/education/2']);
        this.showComments = true; // set showComments to true after a new comment is added
      },
      (error) => {
        console.error('Failed to add comment:', error);
        // Handle the error, such as displaying an error message
      }
    );
  }

  getPostsByCategory(): void {
    this.postService.getPostsByCategory(this.categoryId!!).subscribe((items: Post[]) => {
      this.posts = items;
    });
  }

}
