'use strict';

var usernamePage7 = document.querySelector('#username-pageseven');
var chatPage7 = document.querySelector('#chat-pageseven');
var usernameForm7 = document.querySelector('#usernameFormseven');
var messageForm7 = document.querySelector('#messageFormseven');
var messageInput7 = document.querySelector('#messageseven');
var messageArea7 = document.querySelector('#messageAreaseven');
var connectingElement7 = document.querySelector('.connecting');

var stompClient7 = null;
var username7 = null;

var colors = [
    '#b32c95', '#8774cf', '#3d838d', '#570505',
    '#f5cb32', '#217715', '#d71717', '#00faa5'
];


function connect7(event) {
    username7 = document.querySelector('#nameseven').value.trim();

    if(username7) {
        usernamePage7.classList.add('hidden');
        chatPage7.classList.remove('hidden');

        var socket7 = new SockJS('/ws');
        stompClient7 = Stomp.over(socket7);

        stompClient7.connect({}, onConnected7, onError7);
    }
    event.preventDefault();
}


function onConnected7() {
    // Subscribe to the Public Topic
    stompClient7.subscribe('/topic/publicseven', onMessageReceived7);

    // Tell your username to the server
    stompClient7.send("/app/chatseven.addUser",
        {},
        JSON.stringify({sender: username7, type: 'JOIN'})
    )

    connectingElement7.classList.add('hidden');
}


function onError7(error) {q
    connectingElement7.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement7.style.color = 'red';
}


function sendMessage7(event) {
    var messageContent7 = messageInput7.value.trim();

    if(messageContent7 && stompClient7) {
        var chatMessage7 = {
            sender: username7,
            content: messageInput7.value,
            type: 'CHAT'
        };

        stompClient7.send("/app/chatseven.sendMessage", {}, JSON.stringify(chatMessage7));
        messageInput7.value = '';
    }
    event.preventDefault();
}


function onMessageReceived7(payload) {
    var message7 = JSON.parse(payload.body);

    var messageElement7 = document.createElement('li');

    if(message7.type === 'JOIN') {
        messageElement7.classList.add('event-message');
        message7.content = message7.sender + ' joined!';
    } else if (message7.type === 'LEAVE') {
        messageElement7.classList.add('event-message');
        message7.content = message7.sender + ' left!';
    } else {
        messageElement7.classList.add('chat-message');

        var avatarElement7 = document.createElement('i');
        var avatarText7 = document.createTextNode(message7.sender[0]);
        avatarElement7.appendChild(avatarText7);
        avatarElement7.style['background-color'] = getAvatarColor7(message7.sender);

        messageElement7.appendChild(avatarElement7);

        var usernameElement7 = document.createElement('span');
        var usernameText7 = document.createTextNode(message7.sender);
        usernameElement7.appendChild(usernameText7);
        messageElement7.appendChild(usernameElement7);
    }

    var textElement7 = document.createElement('p');
    var messageText7 = document.createTextNode(message7.content);
    textElement7.appendChild(messageText7);

    messageElement7.appendChild(textElement7);

    messageArea7.appendChild(messageElement7);
    messageArea7.scrollTop = messageArea7.scrollHeight;
}


function getAvatarColor7(messageSender) {
    var hash7 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash7 = 31 * hash7 + messageSender.charCodeAt(i);
    }

    var index7 = Math.abs(hash7 % colors.length);
    return colors[index7];
}

usernameForm7.addEventListener('submit', connect7, true)
messageForm7.addEventListener('submit', sendMessage7, true)