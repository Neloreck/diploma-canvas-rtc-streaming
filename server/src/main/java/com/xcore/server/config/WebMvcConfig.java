package com.xcore.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/public/**")
        .addResourceLocations("classpath:/public/");
  }

  @Bean
  public ViewResolver viewResolver() {
    ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();

    viewResolver.setPrefix("classpath:/templates/");
    viewResolver.setSuffix(".mustache");

    return viewResolver;
  }

}
