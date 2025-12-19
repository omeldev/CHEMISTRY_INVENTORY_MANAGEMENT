package dev.omel.bean;

import dev.omel.entity.UserEntity;

public record UserBean(
  Long id,
  String username,
  String password
) {

  public static UserBean from(UserEntity entity) {
    return new UserBean(
      entity.getId(),
      entity.getUsername(),
      "" // Do not expose password
    );
  }
}
