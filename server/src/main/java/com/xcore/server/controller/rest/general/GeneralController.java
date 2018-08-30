package com.xcore.server.controller.rest.general;

import com.xcore.server.controller.rest.general.api.ApiInfoResponse;
import com.xcore.server.controller.rest.general.api.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GeneralController {

  @RequestMapping({"{path:(?!public|ws).*}/**", "/"})
  @ResponseStatus(value =  HttpStatus.ACCEPTED)
  public String handleFallback(@PathVariable final String path) {
    return "redirect: public/spa";
  }

  @ResponseBody
  @RequestMapping("/api")
  public ApiInfoResponse handleApiInfoDetails() {
    return new ApiInfoResponse();
  }

  @ResponseBody
  @RequestMapping("/api/**")
  @ResponseStatus(value = HttpStatus.NOT_FOUND)
  public ErrorResponse handleApiWrongEndpointError() {
    return new ErrorResponse("Failed to find api endpoint.");
  }

  @GetMapping("/error")
  @ResponseStatus(value =  HttpStatus.INTERNAL_SERVER_ERROR)
  public ModelAndView handleError() {
    return new ModelAndView("error");
  }

}
