package com.tech.socialsphere.controllers;

import com.tech.socialsphere.dto.CommentDto;
import com.tech.socialsphere.dto.PostDto;
import com.tech.socialsphere.model.Post;
import com.tech.socialsphere.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PostController {
    @Autowired
    PostService postService;
    @GetMapping("/posts")
    public ResponseEntity<?> getAllPosts(){
        return new ResponseEntity<>(postService.getALlPost(), HttpStatus.OK);
    }
    @PostMapping("/addpost")
    public ResponseEntity<?> addPost(@RequestBody PostDto postDto){
        return new ResponseEntity<>(postService.addPost(postDto),HttpStatus.OK);
    }

    @GetMapping("/getallpost/{id}")
    public ResponseEntity<?> getAllPosts(@PathVariable Long id){
        return new ResponseEntity<>(postService.getAllPostByAuthorId(id),HttpStatus.OK);
    }
    @PostMapping("/posts/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable("postId") Long postId,@RequestBody String uId) {
        return new ResponseEntity<>(postService.likePost(postId,uId),HttpStatus.OK);
    }

    @PostMapping("/posts/{postId}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable("postId") Long postId,@RequestBody String uId) {

        return new ResponseEntity<>(postService.unlikePost(postId,uId),HttpStatus.OK);
    }
    @DeleteMapping("post/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("post/{postId}/comments")
    public ResponseEntity<?> getCommentsByPost(@PathVariable Long postId){
        return new ResponseEntity<>(postService.getCommentByPost(postId),HttpStatus.OK);
    }
    @PostMapping("post/{postId}/comments/create")
    public ResponseEntity<?> createComment(@PathVariable Long postId,@RequestBody CommentDto commentDto){
        return new ResponseEntity<>(postService.createPostComment(postId,commentDto),HttpStatus.OK);
    }
    @GetMapping("post/{postId}")
    public ResponseEntity<?> findPost(@PathVariable Long postId){
        return new ResponseEntity<>(postService.getPostById(postId),HttpStatus.OK);
    }
}
