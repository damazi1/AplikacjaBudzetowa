// src/main/java/pczstudent/pracainz/budgetmanagementapp/config/JwtAuthenticationFilter.java
package pczstudent.pracainz.budgetmanagementapp.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = null;
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        } else {
            // Szukaj tokena w ciasteczkach
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("jwt".equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }
        }

        if (token != null) {
            if (JwtUtil.validateToken(token)) {
                Authentication auth = new UsernamePasswordAuthenticationToken("user", null, Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } else if (!request.getRequestURI().startsWith("/User/login")
                && !request.getRequestURI().startsWith("/User/register")
                && !request.getRequestURI().startsWith("/User/list")
                && !request.getRequestURI().startsWith("/Account/create")
                && !request.getRequestURI().startsWith("/Account/get/")
                && !request.getRequestURI().startsWith("/Transaction/create/transfer")
                && !request.getRequestURI().startsWith("/Transaction/create/deposit")
                && !request.getRequestURI().startsWith("/Transaction/create/withdrawal")
                && !request.getRequestURI().startsWith("/Transfer/all/")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        filterChain.doFilter(request, response);
    }
}