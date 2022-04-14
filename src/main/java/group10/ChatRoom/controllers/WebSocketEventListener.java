package group10.ChatRoom.controllers;

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

        String username3 = (String) headerAccessor1.getSessionAttributes().get("username3");

        String username4 = (String) headerAccessor1.getSessionAttributes().get("username4");

        String username5 = (String) headerAccessor1.getSessionAttributes().get("username5");

        String username6 = (String) headerAccessor1.getSessionAttributes().get("username6");

        String username7 = (String) headerAccessor1.getSessionAttributes().get("username7");

        String username8 = (String) headerAccessor1.getSessionAttributes().get("username8");


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

        if(username3 != null){
            logger.info("User Disconnected : " + username3);

            ChatMessage chatMessage3 = new ChatMessage();
            chatMessage3.setType(ChatMessage.MessageType.LEAVE);
            chatMessage3.setSender(username3);


            messagingTemplateTwo.convertAndSend("/topic/publicthree", chatMessage3);
        }

        if(username4 != null){
            logger.info("User Disconnected : " + username4);

            ChatMessage chatMessage4 = new ChatMessage();
            chatMessage4.setType(ChatMessage.MessageType.LEAVE);
            chatMessage4.setSender(username4);


            messagingTemplateTwo.convertAndSend("/topic/publicfour", chatMessage4);
        }

        if(username5 != null){
            logger.info("User Disconnected : " + username5);

            ChatMessage chatMessage5 = new ChatMessage();
            chatMessage5.setType(ChatMessage.MessageType.LEAVE);
            chatMessage5.setSender(username5);


            messagingTemplateTwo.convertAndSend("/topic/publicfive", chatMessage5);
        }

        if(username6 != null){
            logger.info("User Disconnected : " + username6);

            ChatMessage chatMessage6 = new ChatMessage();
            chatMessage6.setType(ChatMessage.MessageType.LEAVE);
            chatMessage6.setSender(username6);


            messagingTemplateTwo.convertAndSend("/topic/publicsix", chatMessage6);
        }

        if(username7 != null){
            logger.info("User Disconnected : " + username7);

            ChatMessage chatMessage7 = new ChatMessage();
            chatMessage7.setType(ChatMessage.MessageType.LEAVE);
            chatMessage7.setSender(username7);


            messagingTemplateTwo.convertAndSend("/topic/publicseven", chatMessage7);
        }

        if(username8 != null){
            logger.info("User Disconnected : " + username8);

            ChatMessage chatMessage8 = new ChatMessage();
            chatMessage8.setType(ChatMessage.MessageType.LEAVE);
            chatMessage8.setSender(username8);


            messagingTemplateTwo.convertAndSend("/topic/publiceight", chatMessage8);
        }
    }
}
