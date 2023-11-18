package com.tech.socialsphere.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tech.socialsphere.model.User;

import java.util.List;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    @Query(value = "SELECT * \n" +
            "FROM Users\n" +
            "WHERE LOWER(name) LIKE '%' || LOWER(:searchTerm) || '%'",
            nativeQuery = true)
    List<User> findByEmailOrName(String searchTerm);

//    List<User> findByNameOrEmail(String query);
}
