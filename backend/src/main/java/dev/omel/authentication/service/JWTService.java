package dev.omel.authentication.service;

import jakarta.servlet.http.HttpServletRequest;

public interface JWTService {

  String generateToken(Long id, String userName);

  Long extractId(String token);

  String extractUsername(String token);

  boolean validateToken(String token);

  String extractJwtFromCookies(HttpServletRequest request);
}
