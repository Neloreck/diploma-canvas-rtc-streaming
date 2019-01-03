package com.xcore.server.configs.general;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

import java.util.List;
import java.util.Arrays;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

  @Autowired
  ApplicationConfig applicationConfig;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {

    List<String> ignoredResources = Arrays.asList("websocket", "auth", "api", "favicon");

    // Handle static files.
    registry
      .addResourceHandler("/public/**")
      .addResourceLocations("classpath:/public/");

    // Spa fallback.
    registry
      .addResourceHandler( "/", "/**")
      .setCachePeriod(3600)
      .addResourceLocations("classpath:/public/spa/index.html")
      .resourceChain(true)
      .addResolver(new GzipResourceResolver())
      .addResolver(new PathResourceResolver() {

        @Override
        protected Resource getResource(String resourcePath, Resource location) {

          if (ignoredResources.stream().anyMatch(resourcePath::startsWith)) {
            return null;
          }

          if (location.exists() && location.isReadable()) {
            return location;
          }

          return null;
        }

      });
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {

    registry
        .addMapping("/**")
        .allowCredentials(true);

    String[] allowedOrigins = applicationConfig.getAllowedOrigins().toArray(new String[0]);

    registry.addMapping("/**")
      .allowedOrigins(allowedOrigins)
      .allowedMethods("GET", "POST", "OPTIONS", "PUT", "DELETE")
      .allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-ApiRequest-Method", "Access-Control-ApiRequest-Headers")
      .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
      .allowCredentials(true)
      .maxAge(3600);
  }

  @Bean
  public ViewResolver viewResolver() {

    ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();

    viewResolver.setPrefix("classpath:templates/");
    viewResolver.setSuffix(".mustache");

    return viewResolver;
  }

}
