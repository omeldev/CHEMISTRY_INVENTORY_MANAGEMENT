package dev.omel.authentication.interceptor;

import dev.omel.authentication.filter.annotation.InternalCommunication;
import dev.omel.authentication.filter.annotation.RequiresNoAuthentication;
import dev.omel.authentication.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JWTInterceptor implements HandlerInterceptor {

  private final JWTService jwtService;

  public JWTInterceptor(JWTService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    // Check if the handler is a method (not a static resource)

    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
      return true;
    }

    if (!(handler instanceof HandlerMethod handlerMethod)) {
      return true;
    }


    // Check if the request comes from localhost
    if (handlerMethod.hasMethodAnnotation(InternalCommunication.class)
      && (!"127.0.0.1".equals(request.getRemoteAddr()) && !"0:0:0:0:0:0:0:1".equals(request.getRemoteAddr()))) {
      System.out.println("BLOCKED");
      System.out.println(request.getRemoteAddr());
      return false;
    }

    // Check if the endpoint has @RequiresNonAuthentication annotation
    if (handlerMethod.hasMethodAnnotation(RequiresNoAuthentication.class) || handlerMethod.hasMethodAnnotation(InternalCommunication.class)) {
      return true;
    }

    // Normal authentication flow
    String token = jwtService.extractJwtFromCookies(request);
    if (token == null || !jwtService.validateToken(token)) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
      return false;
    }


    return true; // Allow request to proceed
  }


}
