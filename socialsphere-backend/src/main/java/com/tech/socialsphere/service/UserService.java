package com.tech.socialsphere.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.tech.socialsphere.dto.SignupDto;
import com.tech.socialsphere.dto.UserUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import com.tech.socialsphere.dao.UserDao;
import com.tech.socialsphere.model.User;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    UserDao userdao;

    public User signup(SignupDto signupDto) {
        User newUser = new User();
        newUser.setName(signupDto.getName());
        newUser.setEmail(signupDto.getEmail());
        newUser.setPassword(signupDto.getPassword());
        newUser.setProfilePhotoUrl(signupDto.getProfilePhotoUrl());
        newUser.setCoverPhotoUrl(signupDto.getCoverPhotoUrl());
        newUser.setBio(signupDto.getBio());
        newUser.setGender(signupDto.getGender());
        newUser.setFollowingCount(0);
        newUser.setFollowerCount(0);
        newUser.setCreatedAt(new Date());
        newUser.setUpdatedAt(new Date());
        return userdao.save(newUser);
    }
    public List<User> getallUser() {
        return userdao.findAll();
    }

    public User existByEmail(String email) {
        return userdao.findByEmail(email);
    }

    public User updateUser(Integer userId,UserUpdateDto userUpdateDto) {
        User user = null;
        try {
            user = userdao.findById(userId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }

        user.setName(userUpdateDto.getName());
        user.setBio(userUpdateDto.getBio());
        user.setCoverPhotoUrl(userUpdateDto.getCoverPhotoUrl());
        user.setProfilePhotoUrl(userUpdateDto.getProfilePhotoUrl());
        String existingPassword = user.getPassword();

        // Update entity
        userdao.save(user);

        // Set original password back
        user.setPassword(existingPassword);
        // etc
        return user;
    }

    public List<User> searchUsers(String query) {
        return userdao.findByEmailOrName(query);
    }

    public Optional<User> getUserById(Integer id) {
        return userdao.findById(id);
    }

//    public List<User> findByNameOrEmail(String query) {
//        return userdao.findByNameOrEmail(query);
//    }
}
