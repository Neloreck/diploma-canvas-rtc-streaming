package com.xcore.application.authentication.utils

import org.springframework.security.oauth2.provider.token.TokenEnhancer
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.common.{DefaultOAuth2AccessToken, OAuth2AccessToken}
import java.util

import com.xcore.application.authentication.models.user.AppUser

class AuthTokenEnhancer extends TokenEnhancer {

  override def enhance(accessToken: OAuth2AccessToken, authentication: OAuth2Authentication): OAuth2AccessToken = {

    val additionalInfo: util.Map[String, Object] = new util.HashMap;

    additionalInfo.put("username", authentication.getPrincipal.asInstanceOf[AppUser].getUsername);

    accessToken.asInstanceOf[DefaultOAuth2AccessToken].setAdditionalInformation(additionalInfo);
    accessToken;
  }

}
