package dev.omel.service;

import dev.omel.bean.UserBean;

public interface UserService {

  boolean isUserExisting();

  UserBean createUser(String username, String password);

  UserBean updateUser(Long id, UserBean user);

  UserBean getUserById(Long id);

  UserBean authenticate(String username, String password);
}
