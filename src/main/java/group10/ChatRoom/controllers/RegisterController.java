package group10.ChatRoom.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import group10.ChatRoom.entities.User;
import group10.ChatRoom.services.UserService;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Controller
public class RegisterController {    

    @Autowired
    private UserService userService;
    
    @GetMapping(value="/register")
    public ModelAndView register(){
        ModelAndView modelAndView = new ModelAndView();
        User user = new User(); //New user
        modelAndView.addObject("user", user);
        modelAndView.setViewName("register/register");
        return modelAndView; //Return registration page
    }

    @GetMapping("/login")
    public ModelAndView login(HttpSession session){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("view/login"); //Login page
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return modelAndView;
        }
        modelAndView.setViewName("/");
        return modelAndView; //Return login page
    }

    @PostMapping(value = "/register")
    public String createNewUser(@Valid User user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        User userExists = userService.findUserByEmail(user.getEmail()); //Find user by email
        if (userExists != null) {
            bindingResult
                    .rejectValue("username", "error.user",
                            "There is already a user registered with the user name provided");
        }
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("register/register");
        } else {
            userService.saveUser(user);
            modelAndView.addObject("successMessage", "User has been registered successfully");
            modelAndView.addObject("user", new User());
            modelAndView.setViewName("register/register");

        }
        return "register/register_success"; //Return register success page
    }

    @GetMapping(value="/admin/home")
    public ModelAndView home(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());
        modelAndView.addObject("userName", "Welcome " + user.getEmail() + "/" + user.getFirstName() + " " + user.getLastName() + " (" + user.getEmail() + ")");
        modelAndView.addObject("adminMessage","Content Available Only for Users with Admin Role");
        modelAndView.setViewName("admin/home");
        return modelAndView;
    }
}
