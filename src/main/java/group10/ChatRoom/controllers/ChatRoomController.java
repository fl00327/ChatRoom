package group10.ChatRoom.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatRoomController {
    @GetMapping("/chatrooms")
    public String showContactPage(){
        return "view/chatrooms"; //Return chatroom page
    }
}
