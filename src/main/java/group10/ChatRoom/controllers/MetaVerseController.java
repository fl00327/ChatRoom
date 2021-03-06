package group10.ChatRoom.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

import group10.ChatRoom.entities.ChatMessage;
import group10.ChatRoom.entities.User;

@Controller
public class MetaVerseController {

    @GetMapping("/metaverse")
    public String getMetaVerseChat(User user){
        return "view/metaverse"; //Return metaverse page
    }

    @MessageMapping("/chattwo.sendMessage")
    @SendTo("/topic/publictwo")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chattwo.addUser")
    @SendTo("/topic/publictwo")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username2", chatMessage.getSender());
        return chatMessage;
    }


}
