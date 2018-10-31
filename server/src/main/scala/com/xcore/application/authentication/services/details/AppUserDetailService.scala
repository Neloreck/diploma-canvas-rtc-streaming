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

  /*
   * Actually, search by id.
   * Auth lib related.
   */
  @throws[UsernameNotFoundException]
  override def loadUserByUsername(userId: String): UserDetails = loadUserById(java.lang.Long.parseLong(userId));

  @throws[UsernameNotFoundException]
  def loadUserById(userId: Long): UserDetails = {

    val optionalUser: Optional[AppUser] = appUserRepository.findById(userId);

    if (optionalUser.get() == null) {
      throw new UsernameNotFoundException("Invalid username or password.")
    } else {
      optionalUser.get();
    }
  }

}
