'use strict';

var usernamePage4 = document.querySelector('#username-pagefour');
var chatPage4 = document.querySelector('#chat-pagefour');
var usernameForm4 = document.querySelector('#usernameFormfour');
var messageForm4 = document.querySelector('#messageFormfour');
var messageInput4 = document.querySelector('#messagefour');
var messageArea4 = document.querySelector('#messageAreafour');
var connectingElement4 = document.querySelector('.connecting');

var stompClient4 = null;
var username4 = null;

var colors = [
    '#b32c95', '#8774cf', '#ee6103', '#4ad210',
    '#f5cb32', '#0bd4c3', '#d71616', '#00faa5'
];


function connect4(event) {
    username4 = document.querySelector('#namefour').value.trim();

    if(username4) {
        usernamePage4.classList.add('hidden');
        chatPage4.classList.remove('hidden');

        var socket4 = new SockJS('/ws');
        stompClient4 = Stomp.over(socket4);

        stompClient4.connect({}, onConnected4, onError4);
    }
    event.preventDefault();
}


function onConnected4() {
    // Subscribe to the Public Topic
    stompClient4.subscribe('/topic/publicfour', onMessageReceived4);

    // Tell your username to the server
    stompClient4.send("/app/chatfour.addUser",
        {},
        JSON.stringify({sender: username4, type: 'JOIN'})
    )

    connectingElement4.classList.add('hidden');
}


function onError4(error) {
    connectingElement4.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement4.style.color = 'red';
}


function sendMessage4(event) {
    var messageContent4 = messageInput4.value.trim();

    if(messageContent4 && stompClient4) {
        var chatMessage4 = {
            sender: username4,
            content: messageInput4.value,
            type: 'CHAT'
        };

        stompClient4.send("/app/chatfour.sendMessage", {}, JSON.stringify(chatMessage4));
        messageInput4.value = '';
    }
    event.preventDefault();
}


function onMessageReceived4(payload) {
    var message4 = JSON.parse(payload.body);

    var messageElement4 = document.createElement('li');

    if(message4.type === 'JOIN') {
        messageElement4.classList.add('event-message');
        message4.content = message4.sender + ' joined!';
    } else if (message4.type === 'LEAVE') {
        messageElement4.classList.add('event-message');
        message4.content = message4.sender + ' left!';
    } else {
        messageElement4.classList.add('chat-message');

        var avatarElement4 = document.createElement('i');
        var avatarText4 = document.createTextNode(message4.sender[0]);
        avatarElement4.appendChild(avatarText4);
        avatarElement4.style['background-color'] = getAvatarColor4(message4.sender);

        messageElement4.appendChild(avatarElement4);

        var usernameElement4 = document.createElement('span');
        var usernameText4 = document.createTextNode(message4.sender);
        usernameElement4.appendChild(usernameText4);
        messageElement4.appendChild(usernameElement4);
    }

    var textElement4 = document.createElement('p');
    var messageText4 = document.createTextNode(message4.content);
    textElement4.appendChild(messageText4);

    messageElement4.appendChild(textElement4);

    messageArea4.appendChild(messageElement4);
    messageArea4.scrollTop = messageArea4.scrollHeight;
}


function getAvatarColor4(messageSender) {
    var hash4 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash4 = 31 * hash4 + messageSender.charCodeAt(i);
    }

    var index4 = Math.abs(hash4 % colors.length);
    return colors[index4];
}

usernameForm4.addEventListener('submit', connect4, true)
messageForm4.addEventListener('submit', sendMessage4, true)