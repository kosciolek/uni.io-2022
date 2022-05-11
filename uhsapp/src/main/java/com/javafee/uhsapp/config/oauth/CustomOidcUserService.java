package com.javafee.uhsapp.config.oauth;

import com.javafee.uhsapp.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.security.NoSuchAlgorithmException;

@Service
public class CustomOidcUserService extends OidcUserService {
    @Autowired
    private CustomUserDetailsService userDetailsService;


    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);

        try {
            return processOidcUser(userRequest, oidcUser);
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OidcUser processOidcUser(OidcUserRequest userRequest, OidcUser oidcUser) {
        UserOAuth2Info userOAuth2Info = new UserOAuth2Info(oidcUser.getAttributes());

        try {
            userDetailsService.createUser(userOAuth2Info.getEmail(), userOAuth2Info.getName());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            // TODO: handle redirect or sth
        } catch (LoginException e) {
            return oidcUser;
            // TODO: handle redirect or sth
        }
        return oidcUser;
    }
}
