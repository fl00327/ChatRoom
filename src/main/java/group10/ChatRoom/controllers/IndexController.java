package group10.ChatRoom.controllers;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import group10.ChatRoom.services.UserService;

@Controller
public class IndexController {
    @Autowired
    UserService userService;

    @GetMapping("")
    public String showIndexPage(Model model, HttpSession session){    
        if(session.getAttribute("user") != null){
            model.addAttribute("user", session.getAttribute("user")); //If the user is logged in, return the user to model
        }
        return "view/index"; //Return index page
    }    
}
