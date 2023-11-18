package com.tech.socialsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {
    private String name;
    private String email;
    private String password;
    private String profilePhotoUrl;
    private String coverPhotoUrl;
    private String gender;
    private String Bio;
}
