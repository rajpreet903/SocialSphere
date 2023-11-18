package com.tech.socialsphere.dao;

import com.tech.socialsphere.model.Comment;
import com.tech.socialsphere.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao extends JpaRepository<Comment,Long> {
    List<Comment> findByPost(Post targetPost);
}
