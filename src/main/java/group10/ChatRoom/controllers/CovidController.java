package group10.ChatRoom.controllers;

import group10.ChatRoom.entities.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CovidController {

    @GetMapping("/covid")
    public String getCovid(User user){
        return "view/covid"; //Return COVID page
    }

}
