package com.tech.socialsphere.service;

import com.tech.socialsphere.dao.CommentDao;
import com.tech.socialsphere.dao.PostDao;
import com.tech.socialsphere.dto.CommentDto;
import com.tech.socialsphere.dto.PostDto;
import com.tech.socialsphere.exception.PostNotFoundException;
import com.tech.socialsphere.model.Comment;
import com.tech.socialsphere.model.Post;
import com.tech.socialsphere.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    PostDao postDao;

    @Autowired
    UserService userService;
    @Autowired
    CommentDao commentDao;
    @Autowired
    CommentService commentService;
    public List<Post> getALlPost() {
        return postDao.findAll();
    }

    public Post addPost(PostDto postDto) {
        Post post = new Post();
        User currentUser = userService.existByEmail(postDto.getEmail());
        post.setContent(postDto.getContent());
        post.setPostPhoto(postDto.getPostPhoto());
        post.setCommentCount(0);
        post.setAuthor(currentUser);
        post.setLikeCount(0);
        post.setLikedByUser(false);
        return postDao.save(post);
    }

    public List<Post> getAllPostByAuthorId(Long id) {
        return postDao.findAllByAuthorId(id);
    }

    public Post likePost(Long postId,String uId) {
        Post post = postDao.findById(postId).get();
        if(post.getLikedUserIds().contains(uId)){
            return post;
        }
        post.setLikeCount(post.getLikeCount()+1);
        post.getLikedUserIds().add(uId);
        post.setLikedByUser(true);
        return postDao.save(post);
    }

    public Post unlikePost(Long postId,String uId) {
        Post post = postDao.findById(postId).get();

        if(!post.getLikedUserIds().contains(uId)){
            return post;
        }
        post.setLikeCount(post.getLikeCount() -1);
        post.getLikedUserIds().remove(uId);
        post.setLikedByUser(false);
        return postDao.save(post);
    }
    public void deletePost(Long postId){
        postDao.deleteById(postId);
    }
    public Post getPostById(Long postId) {
        return postDao.findById(postId).orElseThrow(PostNotFoundException::new);
    }
    public Comment createPostComment(Long postId, CommentDto commentDto){
        Post targetPost = getPostById(postId);
        Comment savedComment = commentService.createComment(commentDto,targetPost);
        targetPost.setCommentCount(targetPost.getCommentCount()+1);
        postDao.save(targetPost);
        return savedComment;
    }

    public List<Comment> getCommentByPost(Long postId) {
        Post targetPost = getPostById(postId);
        return commentDao.findByPost(targetPost);
    }
}

