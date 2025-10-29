package pczstudent.pracainz.budgetmanagementapp.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pczstudent.pracainz.budgetmanagementapp.dto.AuthDto;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.service.AuthenticationService;
import pczstudent.pracainz.budgetmanagementapp.service.JwtService;

@RequestMapping("/auth")
@RestController
@AllArgsConstructor
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody AuthDto authDto) {
        User registeredUser = authenticationService.signup(authDto);
        return ResponseEntity.ok(registeredUser);
    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthDto authDto, HttpServletResponse response) {
        User authenticatedUser = authenticationService.authenticate(authDto);
        ResponseCookie cookie = ResponseCookie.from("jwt", jwtService.generateToken(authenticatedUser))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite(SameSiteCookies.STRICT.toString())
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(authenticatedUser);
    }
}
