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
public class BusinessChatController {

    @GetMapping("/business")
    public String getBusinessChat(User user){
        return "view/business"; //Return businessChat page
    }

    @MessageMapping("/chateight.sendMessage")
    @SendTo("/topic/publiceight")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chateight.addUser")
    @SendTo("/topic/publiceight")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username8", chatMessage.getSender());
        return chatMessage;
    }


}