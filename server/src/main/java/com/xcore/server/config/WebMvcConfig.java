package com.xcore.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

import java.io.IOException;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

  @Autowired
  ApplicationConfig applicationConfig;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/public/**")
        .addResourceLocations("classpath:/public/");

    registry.addResourceHandler( "/", "/**")
        .setCachePeriod(0)
        .addResourceLocations("classpath:/public/spa/index.html")
        .resourceChain(true)
        .addResolver(new PathResourceResolver() {
          @Override
          protected Resource getResource(String resourcePath, Resource location) throws IOException {
            if (resourcePath.startsWith("api") || resourcePath.startsWith("ws") || resourcePath.startsWith("favicon")) {
              return null;
            }

            return location.exists() && location.isReadable() ? location : null;
          }
        });
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {

    String[] allowedOrigins = applicationConfig.getAllowedOrigins().stream().toArray(String[]::new);

    registry.addMapping("/**")
        .allowedOrigins(allowedOrigins)
        .allowedMethods("GET", "POST", "OPTIONS", "PUT", "DELETE")
        .allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers")
        .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
        .allowCredentials(true)
        .maxAge(3600);
  }

  @Bean
  public ViewResolver viewResolver() {
    ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();

    viewResolver.setPrefix("classpath:/templates/");
    viewResolver.setSuffix(".mustache");

    return viewResolver;
  }

}
