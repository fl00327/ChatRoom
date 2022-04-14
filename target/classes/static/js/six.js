'use strict';

var usernamePage6 = document.querySelector('#username-pagesix');
var chatPage6 = document.querySelector('#chat-pagesix');
var usernameForm6 = document.querySelector('#usernameFormsix');
var messageForm6 = document.querySelector('#messageFormsix');
var messageInput6 = document.querySelector('#messagesix');
var messageArea6 = document.querySelector('#messageAreasix');
var connectingElement6 = document.querySelector('.connecting');

var stompClient6 = null;
var username6 = null;

var colors = [
    '#b32c95', '#8774cf', '#3d838d', '#560505',
    '#f5cb32', '#216615', '#d71616', '#00faa5'
];


function connect6(event) {
    username6 = document.querySelector('#namesix').value.trim();

    if(username6) {
        usernamePage6.classList.add('hidden');
        chatPage6.classList.remove('hidden');

        var socket6 = new SockJS('/ws');
        stompClient6 = Stomp.over(socket6);

        stompClient6.connect({}, onConnected6, onError6);
    }
    event.preventDefault();
}


function onConnected6() {
    // Subscribe to the Public Topic
    stompClient6.subscribe('/topic/publicsix', onMessageReceived6);

    // Tell your username to the server
    stompClient6.send("/app/chatsix.addUser",
        {},
        JSON.stringify({sender: username6, type: 'JOIN'})
    )

    connectingElement6.classList.add('hidden');
}


function onError6(error) {
    connectingElement6.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement6.style.color = 'red';
}


function sendMessage6(event) {
    var messageContent6 = messageInput6.value.trim();

    if(messageContent6 && stompClient6) {
        var chatMessage6 = {
            sender: username6,
            content: messageInput6.value,
            type: 'CHAT'
        };

        stompClient6.send("/app/chatsix.sendMessage", {}, JSON.stringify(chatMessage6));
        messageInput6.value = '';
    }
    event.preventDefault();
}


function onMessageReceived6(payload) {
    var message6 = JSON.parse(payload.body);

    var messageElement6 = document.createElement('li');

    if(message6.type === 'JOIN') {
        messageElement6.classList.add('event-message');
        message6.content = message6.sender + ' joined!';
    } else if (message6.type === 'LEAVE') {
        messageElement6.classList.add('event-message');
        message6.content = message6.sender + ' left!';
    } else {
        messageElement6.classList.add('chat-message');

        var avatarElement6 = document.createElement('i');
        var avatarText6 = document.createTextNode(message6.sender[0]);
        avatarElement6.appendChild(avatarText6);
        avatarElement6.style['background-color'] = getAvatarColor6(message6.sender);

        messageElement6.appendChild(avatarElement6);

        var usernameElement6 = document.createElement('span');
        var usernameText6 = document.createTextNode(message6.sender);
        usernameElement6.appendChild(usernameText6);
        messageElement6.appendChild(usernameElement6);
    }

    var textElement6 = document.createElement('p');
    var messageText6 = document.createTextNode(message6.content);
    textElement6.appendChild(messageText6);

    messageElement6.appendChild(textElement6);

    messageArea6.appendChild(messageElement6);
    messageArea6.scrollTop = messageArea6.scrollHeight;
}


function getAvatarColor6(messageSender) {
    var hash6 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash6 = 31 * hash6 + messageSender.charCodeAt(i);
    }

    var index6 = Math.abs(hash6 % colors.length);
    return colors[index6];
}

usernameForm6.addEventListener('submit', connect6, true)
messageForm6.addEventListener('submit', sendMessage6, true)