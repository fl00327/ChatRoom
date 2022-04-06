package group10.ChatRoom.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import group10.ChatRoom.entities.User;

@Controller
public class RunningRoutesController {

    @GetMapping("/running_routes")
    public String getMap(User user){
        return "view/running_routes_map"; //Return running routes map
    }
}
