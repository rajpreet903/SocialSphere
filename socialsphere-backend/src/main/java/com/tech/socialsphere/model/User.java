package com.tech.socialsphere.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100,nullable = false)
    private String name;

    @Column(length = 100,unique = true,nullable = false)
    private String email;

    @Column(length = 256,nullable = false)
    @JsonIgnore
    private String password;

    @Column(length = 256,nullable = false)
    private String profilePhotoUrl;

    @Column(length = 256,nullable = false)
    private String coverPhotoUrl;

    @Column(length = 16,nullable = false)
    private String gender;

    @Column(length = 256,nullable = false)
    private String bio;

    private Integer followerCount;
    private Integer followingCount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Post> postList;


}
