package group10.ChatRoom.controllers;

import java.security.Principal;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import group10.ChatRoom.entities.User;
import group10.ChatRoom.services.UserService;

@Controller
public class ProfileController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public String getUserProfile(Model model, Principal principal, HttpSession session){
        String email = principal.getName();
        User user = userService.findUserByEmail(email); //Find user by email
        session.setAttribute("user", user); //Add user to http session
        model.addAttribute("user", user);
        return "view/profile"; //Return user profile page
    }
}
