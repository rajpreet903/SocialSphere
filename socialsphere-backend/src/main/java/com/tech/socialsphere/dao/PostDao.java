package com.tech.socialsphere.dao;

import com.tech.socialsphere.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostDao extends JpaRepository<Post,Long> {

    List<Post> findAllByAuthorId(Long id);
}
