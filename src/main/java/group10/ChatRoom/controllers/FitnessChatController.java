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
public class FitnessChatController {

    @GetMapping("/fitness")
    public String getFitnessChat(User user){
        return "view/fitness"; //Return mental health page
    }

    @MessageMapping("/chatfive.sendMessage")
    @SendTo("/topic/publicfive")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chatfive.addUser")
    @SendTo("/topic/publicfive")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username5", chatMessage.getSender());
        return chatMessage;
    }


}