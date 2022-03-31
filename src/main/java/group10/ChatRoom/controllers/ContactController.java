package group10.ChatRoom.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContactController {
    @GetMapping("/contact")
    public String showContactPage(){
        return "view/contact"; //Return contact page
    }
}
