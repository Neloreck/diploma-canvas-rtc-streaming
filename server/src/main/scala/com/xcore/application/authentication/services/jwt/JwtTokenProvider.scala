package com.xcore.application.authentication.services.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.jsonwebtoken.{UnsupportedJwtException, _};
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.{Date, List, Set};
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.{Authentication, GrantedAuthority};
import org.springframework.security.core.userdetails.User;

import com.xcore.application.authentication.configs.WebSecurityConstants;

@Component
class JwtTokenProvider {

  @Value("${jwt.secret}")
  private var jwtSecret: String = _;

  @Value("${jwt.expiration}")
  private val jwtExpiration: Long = 0L;

  @Value("${jwt.expirationRememberMe}")
  private val jwtExpirationRememberMe: Long = 0L;

  private val log: Logger = LoggerFactory.getLogger("[JWT TOKEN PROVIDER]");

  /*
   * Token generation.
   */

  def generateToken(email: String, authorities: Set[GrantedAuthority], rememberMe: Boolean): String = {

    val expiration: Long = if (rememberMe) jwtExpirationRememberMe else jwtExpiration;
    val now = new Date();
    val expiryDate = new Date(now.getTime + expiration)

    Jwts.builder
      .setSubject(email)
      .claim(WebSecurityConstants.TOKEN_AUTHORITIES_KEY, authorities)
      .claim(WebSecurityConstants.TOKEN_REMEMBER_KEY, rememberMe)
      .setIssuedAt(now)
      .setExpiration(expiryDate)
      .signWith(SignatureAlgorithm.HS512, jwtSecret)
      .compressWith(CompressionCodecs.DEFLATE)
      .compact;
  }

  def generateToken(authentication: Authentication, rememberMe: Boolean): String = {
    val authorities: Set[GrantedAuthority] = authentication.getAuthorities.stream.map(authority => authority.getAuthority).collect(Collectors.toSet);
    generateToken(authentication.getName, authorities, rememberMe);
  }

  /*
   * Token data related.
   */

  def isRememberMe(authToken: String): Boolean = getClaims(authToken).get(WebSecurityConstants.TOKEN_REMEMBER_KEY).asInstanceOf[Boolean];

  def getAuthentication(authToken: String): Authentication = {

    val claims = getClaims(authToken);
    val authorities = claims.get(WebSecurityConstants.TOKEN_AUTHORITIES_KEY).asInstanceOf[List[String]]
      .stream.map(it => new SimpleGrantedAuthority(it)).collect(Collectors.toSet)
    val user = new User(claims.getSubject, "", authorities);

    new UsernamePasswordAuthenticationToken(user, authToken, authorities);
  }

  def validateToken(authToken: String): Boolean = try {

    Jwts
      .parser()
      .setSigningKey(jwtSecret)
      .parseClaimsJws(authToken);

    true;

  } catch {

    case signatureException: SignatureException =>
      log.error("Invalid JWT signature.", signatureException);
      false;

    case malformedJwtException: MalformedJwtException =>
      log.error("Invalid JWT token.", malformedJwtException);
      false;

    case expiredJwtException: ExpiredJwtException =>
      log.error("Expired JWT token.", expiredJwtException);
      false;

    case unsupportedJwtException: UnsupportedJwtException =>
      log.error("Unsupported JWT token.", unsupportedJwtException);
      false;

    case illegalArgumentException: IllegalArgumentException =>
      log.error("JWT claims string is empty.", illegalArgumentException);
      false;
  }

  def getClaims(authToken: String): Claims = {
    Jwts
      .parser()
      .setSigningKey(jwtSecret)
      .parseClaimsJws(authToken)
      .getBody;
  }
}