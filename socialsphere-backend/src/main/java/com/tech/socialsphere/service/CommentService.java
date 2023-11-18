package com.tech.socialsphere.service;

import com.tech.socialsphere.dao.CommentDao;
import com.tech.socialsphere.dto.CommentDto;
import com.tech.socialsphere.dto.PostDto;
import com.tech.socialsphere.model.Comment;
import com.tech.socialsphere.model.Post;
import com.tech.socialsphere.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    CommentDao commentDao;

    @Autowired
    UserService userService;
    public Comment createComment(CommentDto commentDto, Post post){
        Comment newComment = new Comment();
        User author = userService.existByEmail(commentDto.getEmail());
        newComment.setAuthor(author);
        newComment.setPost(post);
        newComment.setContent(commentDto.getContent());
        return commentDao.save(newComment);
    }
}
