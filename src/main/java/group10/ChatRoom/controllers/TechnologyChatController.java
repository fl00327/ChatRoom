package group10.ChatRoom.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

import group10.ChatRoom.entities.ChatMessage;
import group10.ChatRoom.entities.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TechnologyChatController {

    @GetMapping("/technology")
    public String getTechnologyChat(User user){
        return "view/technology"; //Return tech page
    }

    @MessageMapping("/chatfour.sendMessage")
    @SendTo("/topic/publicfour")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chatfour.addUser")
    @SendTo("/topic/publicfour")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username4", chatMessage.getSender());
        return chatMessage;
    }


}