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
public class StudentRoomController {

    @GetMapping("/studentroom")
    public String getStudentRoomChat(User user){
        return "view/studentroom"; //Return chat page
    }

    @MessageMapping("/chatone.sendMessage")
    @SendTo("/topic/publicone")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chatone.addUser")
    @SendTo("/topic/publicone")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username1", chatMessage.getSender());
        return chatMessage;
    }


}
