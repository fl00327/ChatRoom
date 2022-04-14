'use strict';

var usernamePage5 = document.querySelector('#username-pagefive');
var chatPage5 = document.querySelector('#chat-pagefive');
var usernameForm5 = document.querySelector('#usernameFormfive');
var messageForm5 = document.querySelector('#messageFormfive');
var messageInput5 = document.querySelector('#messagefive');
var messageArea5 = document.querySelector('#messageAreafive');
var connectingElement5 = document.querySelector('.connecting');

var stompClient5 = null;
var username5 = null;

var colors = [
    '#b32c95', '#8774cf', '#ee6103', '#4ad210',
    '#f5cb32', '#0bd4c3', '#d71616', '#00faa5'
];


function connect5(event) {
    username5 = document.querySelector('#namefive').value.trim();

    if(username5) {
        usernamePage5.classList.add('hidden');
        chatPage5.classList.remove('hidden');

        var socket5 = new SockJS('/ws');
        stompClient5 = Stomp.over(socket5);

        stompClient5.connect({}, onConnected5, onError5);
    }
    event.preventDefault();
}


function onConnected5() {
    // Subscribe to the Public Topic
    stompClient5.subscribe('/topic/publicfive', onMessageReceived5);

    // Tell your username to the server
    stompClient5.send("/app/chatfive.addUser",
        {},
        JSON.stringify({sender: username5, type: 'JOIN'})
    )

    connectingElement5.classList.add('hidden');
}


function onError5(error) {
    connectingElement5.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement5.style.color = 'red';
}


function sendMessage5(event) {
    var messageContent5 = messageInput5.value.trim();

    if(messageContent5 && stompClient5) {
        var chatMessage5 = {
            sender: username5,
            content: messageInput5.value,
            type: 'CHAT'
        };

        stompClient5.send("/app/chatfive.sendMessage", {}, JSON.stringify(chatMessage5));
        messageInput5.value = '';
    }
    event.preventDefault();
}


function onMessageReceived5(payload) {
    var message5 = JSON.parse(payload.body);

    var messageElement5 = document.createElement('li');

    if(message5.type === 'JOIN') {
        messageElement5.classList.add('event-message');
        message5.content = message5.sender + ' joined!';
    } else if (message5.type === 'LEAVE') {
        messageElement5.classList.add('event-message');
        message5.content = message5.sender + ' left!';
    } else {
        messageElement5.classList.add('chat-message');

        var avatarElement5 = document.createElement('i');
        var avatarText5 = document.createTextNode(message5.sender[0]);
        avatarElement5.appendChild(avatarText5);
        avatarElement5.style['background-color'] = getAvatarColor5(message5.sender);

        messageElement5.appendChild(avatarElement5);

        var usernameElement5 = document.createElement('span');
        var usernameText5 = document.createTextNode(message5.sender);
        usernameElement5.appendChild(usernameText5);
        messageElement5.appendChild(usernameElement5);
    }

    var textElement5 = document.createElement('p');
    var messageText5 = document.createTextNode(message5.content);
    textElement5.appendChild(messageText5);

    messageElement5.appendChild(textElement5);

    messageArea5.appendChild(messageElement5);
    messageArea5.scrollTop = messageArea5.scrollHeight;
}


function getAvatarColor5(messageSender) {
    var hash5 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash5 = 31 * hash5 + messageSender.charCodeAt(i);
    }

    var index5 = Math.abs(hash5 % colors.length);
    return colors[index5];
}

usernameForm5.addEventListener('submit', connect5, true)
messageForm5.addEventListener('submit', sendMessage5, true)