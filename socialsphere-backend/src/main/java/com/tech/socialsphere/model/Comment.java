package com.tech.socialsphere.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1024)
    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id",nullable = false)
    private User author;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id",nullable = false)
    private Post post;
}
