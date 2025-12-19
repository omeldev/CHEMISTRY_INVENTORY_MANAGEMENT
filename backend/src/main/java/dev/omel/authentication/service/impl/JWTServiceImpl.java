package dev.omel.authentication.service.impl;

import dev.omel.authentication.service.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.MacAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Service
public class JWTServiceImpl implements JWTService {
  private final MacAlgorithm algorithm = Jwts.SIG.HS256; // Use HS256 algorithm

  //TODO REPLACE WITH SECRET KEY SOMEDAY
  private final String secretKey = "4161ec7071ffcc5d44c5fd57e61213118a4179692380e039507fa8c1f30c619799c25c7179256478372cf19767819e0c6341434964f7a7de8604f73d67a87a02acead89a280794c17cb7e79e045de97a4e953502b106c99dd324a0574ca592a32c935c11018df54fad612216681368354af34b48dcbffdb91288cf4be327af962856b3b7a125d3adc693b39d6a4cb98be14b671cd98217375c56e11b5897ecf12803383b097075f87408539a8422e9df8737981c163640e63e697929413822a23495f780e0a25294f73f0fe0c11fb336131c81222da41c4b5aeceb5a33ce3cd9045ea3cf52766589b25eb76de797cafe2397606f39adefa593e9aece4230feadb76468ec080950cdf3863a8bf32d4861ec4dd0ac5d5494cea5f36f0a27f7ecbe93dea6a319ba528907ff1de008639f07c13e899f23c6bca245b1752eacf7b3e665d8088b847d2f9159b90711223edace59306ee15dbee00ff79325764153d306c27a3b6b5cc6c91e96a87106a896e2edecc01d355b003a4704eb5b6b40d74b3eead85369ec04a58f831f7ab212c4fa5f9a0fa265b57e1db9c44f7654671786fd1902177ddfbe037fad1ad08b76eb4c044c138f1f05964119f7d371df17af488aa84a44b2df428aebe069fee602cff30e72dc7e743c2f22ecf07067e9c101855b07465400e85dde749ebe05cf0afbed803dfc8716d6f84949fe7f29a2106ee59f"; // Secret key for signing JWT
  private final long expirationTimeMs = 1000 * 60 * 60 * 24; // 24 hours
  private final SecretKey key;

  public JWTServiceImpl() {
    this.key = new SecretKeySpec(Base64.getEncoder().encode(secretKey.getBytes()), "HmacSHA256");  // Convert to SecretKey
  }


  /**
   * Generates a JWT token for the given wallet address. // TODO: update
   *
   * @return A signed JWT token.
   */
  public String generateToken(Long id, String username) {
    return Jwts.builder()
      .claim("id", id)
      .claim("username", username)
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + expirationTimeMs)) // 24 hours expiration
      .signWith(key, algorithm)
      .compact();
  }

  /**
   * Extracts the display name from the JWT.
   *
   * @param token
   * @return
   */
  public String extractUsername(String token) {
    try {
      Claims claims = Jwts.parser()
        .verifyWith(key) // Uses verifyWith instead of setSigningKey
        .build()
        .parseSignedClaims(token)
        .getPayload();
      return claims.get("username", String.class);
    } catch (Exception e) {
      return null; // Invalid or expired token
    }
  }

  /**
   * Extracts the user r
   *
   * @param token
   * @return
   */
  public Long extractId(String token) {
    try {
      Claims claims = Jwts.parser()
        .verifyWith(key) // Uses verifyWith instead of setSigningKey
        .build()
        .parseSignedClaims(token)
        .getPayload();
      return claims.get("id", Number.class).longValue();
    } catch (Exception e) {
      return null; // Invalid or expired token
    }
  }


  /**
   * Validates the JWT token.
   *
   * @param token The JWT token.
   * @return True if valid, otherwise false.
   */
  public boolean validateToken(String token) {
    return extractId(token) != null;
  }

  public String extractJwtFromCookies(HttpServletRequest request) {
    if (request.getCookies() != null) {
      for (Cookie cookie : request.getCookies()) {
        if ("token".equals(cookie.getName())) {
          return cookie.getValue();
        }
      }
    }
    return null;
  }
}
