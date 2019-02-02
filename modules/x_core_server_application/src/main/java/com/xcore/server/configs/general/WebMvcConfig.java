package com.xcore.server.configs.general;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

  @Bean
  public ViewResolver getViewResolver() {

    ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();

    viewResolver.setPrefix("classpath:templates/");
    viewResolver.setSuffix(".mustache");

    return viewResolver;
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {

    // Handle static files.
    registry
      .addResourceHandler("/public/**")
      .addResourceLocations("classpath:/public/");
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {

    registry
      .addMapping("/**")
        .allowCredentials(true)
        .allowedMethods("*")
        .allowedHeaders("*")
        .allowedOrigins("*")
        .maxAge(3600);
  }

}
