package com.tech.socialsphere.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    private String name;
    private String bio;
    private String profilePhotoUrl;
    private String coverPhotoUrl;
}
