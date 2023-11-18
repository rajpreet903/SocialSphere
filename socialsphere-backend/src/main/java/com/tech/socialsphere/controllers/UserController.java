package com.tech.socialsphere.controllers;

import java.util.List;

import com.tech.socialsphere.dto.LoginDto;
import com.tech.socialsphere.dto.SignupDto;
import com.tech.socialsphere.dto.UserUpdateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.tech.socialsphere.model.User;
import com.tech.socialsphere.service.UserService;
import org.springframework.web.context.annotation.RequestScope;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupDto signupDto) {
        User foundUser = userService.existByEmail(signupDto.getEmail());
        System.out.println(foundUser);
        if(foundUser != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User newUser = userService.signup(signupDto);
        return new ResponseEntity<>(newUser, HttpStatus.OK);

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto logindto){
        User foundUser = userService.existByEmail(logindto.getEmail());
            if(foundUser != null && foundUser.getPassword().equals(logindto.getPassword())) {
                return new ResponseEntity<>(foundUser, HttpStatus.OK);
            }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/users")
    public ResponseEntity<?> allUsers(){
        return new ResponseEntity<>(userService.getallUser(),HttpStatus.OK);
    }
    @PutMapping("/user/{id}/update")
    public ResponseEntity<?> updateUser(@PathVariable Integer id,@RequestBody UserUpdateDto userUpdateDto){
        return new ResponseEntity<>(userService.updateUser(id,userUpdateDto),HttpStatus.OK);
    }
    @GetMapping("/user/search")
    public List<User> searchUsers(@RequestParam String query) {

        // Search logic
        return userService.searchUsers(query);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id){
        return new ResponseEntity<>(userService.getUserById(id),HttpStatus.OK);
    }


}
