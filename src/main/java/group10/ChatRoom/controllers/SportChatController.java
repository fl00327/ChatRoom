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
public class SportChatController {

    @GetMapping("/travel")
    public String getSportChat(User user){
        return "view/sport"; //Return extra---/--activities page
    }

    @MessageMapping("/chatseven.sendMessage")
    @SendTo("/topic/publicseven")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chatseven.addUser")
    @SendTo("/topic/publicseven")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username7", chatMessage.getSender());
        return chatMessage;
    }


}