package com.xcore.server.controllers.rest;

import com.xcore.server.controllers.rest.exchange.FailedApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Slf4j(topic = "[✴️ GENERAL CONTROLLER]")
@Controller
public class GeneralController {

  @RequestMapping("/")
  public String handleBaseRoute() {
    return "redirect:/home";
  }

  @ResponseBody
  @RequestMapping("/api/**")
  @ResponseStatus(value = HttpStatus.NOT_FOUND)
  public FailedApiResponse handleApiWrongEndpointError() {
    return new FailedApiResponse("Failed to find api endpoint.");
  }

  @GetMapping("/error")
  public ModelAndView handleGetError(HttpServletRequest request) {

    log.error("Request error: {}, {}.", request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE), request.getAttribute(RequestDispatcher.ERROR_MESSAGE));

    return new ModelAndView("error");
  }

  @ResponseBody
  @PostMapping("/error")
  public FailedApiResponse handlePostError(HttpServletRequest request) {

    log.error("Request error: {}, {}.", request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE), request.getAttribute(RequestDispatcher.ERROR_MESSAGE));

    final HttpStatus httpStatus = HttpStatus.valueOf((Integer)request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE));

    if (httpStatus.is4xxClientError()) {
      return new FailedApiResponse("Request error.", "Failed to proceed request. Check if your format correct.");
    } else if (httpStatus.is5xxServerError()) {
      return new FailedApiResponse("Server error.", "Ooops, unexpected server error.");
    }

    return new FailedApiResponse("Unexpected error.", (String)request.getAttribute(RequestDispatcher.ERROR_MESSAGE));
  }

}
