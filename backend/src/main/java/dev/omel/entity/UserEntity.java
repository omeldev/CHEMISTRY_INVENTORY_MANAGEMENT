package dev.omel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "users")
@Getter
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "username", unique = true)
  @Setter
  private String username;

  @Column(name = "password_hash")
  @Setter
  private String passwordHash;

}
