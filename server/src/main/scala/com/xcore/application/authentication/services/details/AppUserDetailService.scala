package com.xcore.application.authentication.services.details;

import java.util.Optional;

import com.xcore.application.authentication.models.user.{AppUser, IAppUserRepository};
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.{UserDetails, UserDetailsService, UsernameNotFoundException};
import org.springframework.stereotype.Service;

@Service
class AppUserDetailService extends UserDetailsService {

  @Autowired
  private var appUserRepository: IAppUserRepository = _;

  @throws[UsernameNotFoundException]
  def loadUserByUsername(login: String): UserDetails = {

    val optionalUser: Optional[AppUser] = appUserRepository.findByLogin(login);

    if (optionalUser.get() == null) {
      throw new UsernameNotFoundException("Invalid username or password.")
    } else {
      optionalUser.get();
    }
  }

}
