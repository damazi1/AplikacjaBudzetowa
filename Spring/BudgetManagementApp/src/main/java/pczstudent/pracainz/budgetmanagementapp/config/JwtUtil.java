package pczstudent.pracainz.budgetmanagementapp.config;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jwt.*;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET = "bardzotajnykluczbardzotajnyklucz"; // min. 32 znaki!

    public static String generateToken(String login) throws Exception {
        JWSSigner signer = new MACSigner(SECRET.getBytes());
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(login)
                .issueTime(new Date())
                .expirationTime(new Date(System.currentTimeMillis() + 86400000)) // 1 dzień
                .build();

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader(JWSAlgorithm.HS256),
                claimsSet
        );
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }

public static boolean validateToken(String token) {
    try {
        SignedJWT signedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(SECRET.getBytes());
        if (!signedJWT.verify(verifier)) {
            return false;
        }
        Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
        return expiration != null && expiration.after(new Date());
    } catch (Exception e) {
        return false;
    }
}

public static String validateTokenAndGetLogin(String token) throws Exception {
    SignedJWT signedJWT = SignedJWT.parse(token);
    JWSVerifier verifier = new MACVerifier(SECRET.getBytes());
    if (!signedJWT.verify(verifier)) {
        throw new Exception("Nieprawidłowy podpis tokena");
    }
    Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
    if (expiration == null || expiration.before(new Date())) {
        throw new Exception("Token wygasł");
    }
    return signedJWT.getJWTClaimsSet().getSubject();
}
}
