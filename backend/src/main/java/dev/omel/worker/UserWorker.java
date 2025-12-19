package dev.omel.worker;

import dev.omel.bean.UserBean;
import dev.omel.entity.UserEntity;
import dev.omel.repository.UserRepository;
import org.springframework.stereotype.Component;

/**
 * Worker class for user-related operations.
 * It will only be one User in the system.
 * Futurely, this can be extended to support multiple users.
 */
@Component
public class UserWorker {

  public final UserRepository userRepository;

  public UserWorker(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Checks if a user exists in the system.
   *
   * @return true if the user exists, false otherwise
   */
  public boolean isUserExisting() {
    return userRepository.count() > 0;
  }

  public UserBean createUser(String username, String password) {
    var userEntity = userRepository.findByUsername(username);
    if (userEntity.isPresent()) {
      throw new IllegalArgumentException("User with this username already exists");
    }

    UserEntity entity = new UserEntity();
    entity.setUsername(username);
    entity.setPasswordHash(password); // In a real application, make sure to hash the password before storing it

    UserEntity savedEntity = userRepository.save(entity);

    return UserBean.from(savedEntity);
  }

  public UserBean updateUser(Long id, UserBean userBean) {
    UserEntity entity = userRepository.findById(id)
      .orElseThrow(() -> new IllegalArgumentException("User not found"));

    if (userRepository.findByUsername(userBean.username()).isPresent()) {
      throw new IllegalArgumentException("User with this username already exists");
    }

    entity.setUsername(userBean.username());
    entity.setPasswordHash(userBean.password()); // In a real application, make sure to hash the password before storing it
    UserEntity savedEntity = userRepository.save(entity);
    return UserBean.from(savedEntity);
  }

  public UserBean getUserById(Long id) {
    UserEntity entity = userRepository.findById(id)
      .orElseThrow(() -> new IllegalArgumentException("User not found"));

    return UserBean.from(entity);
  }

  public UserBean authenticate(String username, String password) {
    UserEntity entity = userRepository.findByUsername(username)
      .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

    if (!entity.getPasswordHash().equals(password)) { // In a real application, use a secure password comparison
      throw new IllegalArgumentException("Invalid username or password");
    }

    return UserBean.from(entity);
  }

}
