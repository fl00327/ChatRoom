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
public class ChatBotController {

    @GetMapping("/chatbot")
    public String getBusinessChat(User user){
        return "view/chatbot"; //Return chat page
    }

    @MessageMapping("/chatnine.sendMessage")
    @SendTo("/topic/publicnine")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chatnine.addUser")
    @SendTo("/topic/publicnine")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username9", chatMessage.getSender());
        return chatMessage;
    }


}