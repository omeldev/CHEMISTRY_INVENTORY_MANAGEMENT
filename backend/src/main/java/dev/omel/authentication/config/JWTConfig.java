package dev.omel.authentication.config;

import dev.omel.authentication.interceptor.JWTInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class JWTConfig implements WebMvcConfigurer {

  private final JWTInterceptor jwtInterceptor;

  public JWTConfig(JWTInterceptor jwtInterceptor) {
    this.jwtInterceptor = jwtInterceptor;
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    System.out.println("Registering JWT Interceptor");
    registry.addInterceptor(jwtInterceptor)
      .addPathPatterns("/**"); // Apply to all paths
  }
}
