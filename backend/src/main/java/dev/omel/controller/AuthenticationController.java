package dev.omel.controller;

import dev.omel.authentication.filter.annotation.RequiresNoAuthentication;
import dev.omel.authentication.service.JWTService;
import dev.omel.bean.UserBean;
import dev.omel.service.UserService;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

  private final UserService userService;
  private final JWTService jwtService;

  public AuthenticationController(UserService userService, JWTService jwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  @GetMapping("/check")
  @RequiresNoAuthentication
  public ResponseEntity<Boolean> checkUserExisting() {
    boolean exists = userService.isUserExisting();
    return ResponseEntity.ok(exists);
  }


  @PostMapping("/register")
  @RequiresNoAuthentication
  public ResponseEntity<UserBean> registerUser(@RequestBody UserBean userBean) {
    if (userService.isUserExisting()) {
      return ResponseEntity.status(403).build();
    }
    UserBean registeredUser = userService.createUser(userBean.username(), userBean.password());
    return ResponseEntity.ok(registeredUser);
  }

  @PostMapping("/authenticate")
  @RequiresNoAuthentication
  public ResponseEntity<UserBean> authenticateUser(@RequestBody UserBean userBean, @Nonnull HttpServletRequest request) {

    String preJwt = jwtService.extractJwtFromCookies(request);

    if (preJwt != null && jwtService.validateToken(preJwt) && userService.getUserById(jwtService.extractId(preJwt)) != null) {
      return ResponseEntity.ok(userService.getUserById(jwtService.extractId(preJwt)));
    }

    UserBean authenticatedUser = userService.authenticate(userBean.username(), userBean.password());
    if (authenticatedUser == null) {
      return ResponseEntity.status(401).build();
    }

    String jwt = jwtService.generateToken(authenticatedUser.id(), authenticatedUser.username());

    ResponseCookie jwtCookie = ResponseCookie.from("token", jwt)
      .httpOnly(true)
      .secure(true)
      .path("/")
      .maxAge(60 * 60 * 24) // 1 day
      .build();

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(authenticatedUser);
  }

}
