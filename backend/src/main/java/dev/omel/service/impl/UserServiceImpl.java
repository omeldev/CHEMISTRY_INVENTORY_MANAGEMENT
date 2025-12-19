package dev.omel.service.impl;

import dev.omel.bean.UserBean;
import dev.omel.service.UserService;
import dev.omel.worker.UserWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserWorker userWorker;

  public UserServiceImpl(UserWorker userWorker) {
    this.userWorker = userWorker;
  }

  @Override
  public boolean isUserExisting() {
    return userWorker.isUserExisting();
  }

  @Override
  @Transactional
  public UserBean createUser(String username, String password) {
    return userWorker.createUser(username, password);
  }

  @Override
  @Transactional
  public UserBean updateUser(Long id, UserBean user) {
    return userWorker.updateUser(id, user);
  }

  @Override
  public UserBean getUserById(Long id) {
    return userWorker.getUserById(id);
  }

  @Override
  public UserBean authenticate(String username, String password) {
    return userWorker.authenticate(username, password);
  }
}
