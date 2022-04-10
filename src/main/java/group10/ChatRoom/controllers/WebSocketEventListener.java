package group10.ChatRoom.controllers;

//import com.example.websocketdemo.model.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import group10.ChatRoom.entities.ChatMessage;


@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private SimpMessageSendingOperations messagingTemplateOne;

    @Autowired
    private SimpMessageSendingOperations messagingTemplateTwo;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        StompHeaderAccessor headerAccessor1 = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) headerAccessor.getSessionAttributes().get("username");

        String username1 = (String) headerAccessor1.getSessionAttributes().get("username1");

        String username2 = (String) headerAccessor1.getSessionAttributes().get("username2");


        if(username != null) {
            logger.info("User Disconnected : " + username);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatMessage.MessageType.LEAVE);
            chatMessage.setSender(username);



            messagingTemplate.convertAndSend("/topic/public", chatMessage);

        }

        if(username1 != null){
            logger.info("User Disconnected : " + username1);

            ChatMessage chatMessage1 = new ChatMessage();
            chatMessage1.setType(ChatMessage.MessageType.LEAVE);
            chatMessage1.setSender(username1);


            messagingTemplateOne.convertAndSend("/topic/publicone", chatMessage1);
        }

        if(username2 != null){
            logger.info("User Disconnected : " + username2);

            ChatMessage chatMessage2 = new ChatMessage();
            chatMessage2.setType(ChatMessage.MessageType.LEAVE);
            chatMessage2.setSender(username2);


            messagingTemplateTwo.convertAndSend("/topic/publictwo", chatMessage2);
        }
    }
}
