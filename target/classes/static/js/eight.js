'use strict';

var usernamePage8 = document.querySelector('#username-pageeight');
var chatPage8 = document.querySelector('#chat-pageeight');
var usernameForm8 = document.querySelector('#usernameFormeight');
var messageForm8 = document.querySelector('#messageFormeight');
var messageInput8 = document.querySelector('#messageeight');
var messageArea8 = document.querySelector('#messageAreaeight');
var connectingElement8 = document.querySelector('.connecting');

var stompClient8 = null;
var username8 = null;

var colors = [
    '#b32c95', '#8774cf', '#3d838d', '#570505',
    '#f5cb32', '#217715', '#d71717', '#00faa5'
];


function connect8(event) {
    username8 = document.querySelector('#nameeight').value.trim();

    if(username8) {
        usernamePage8.classList.add('hidden');
        chatPage8.classList.remove('hidden');

        var socket8 = new SockJS('/ws');
        stompClient8 = Stomp.over(socket8);

        stompClient8.connect({}, onConnected8, onError8);
    }
    event.preventDefault();
}


function onConnected8() {
    // Subscribe to the Public Topic
    stompClient8.subscribe('/topic/publiceight', onMessageReceived8);

    // Tell your username to the server
    stompClient8.send("/app/chateight.addUser",
        {},
        JSON.stringify({sender: username8, type: 'JOIN'})
    )

    connectingElement8.classList.add('hidden');
}


function onError8(error) {q
    connectingElement8.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement8.style.color = 'red';
}


function sendMessage8(event) {
    var messageContent8 = messageInput8.value.trim();

    if(messageContent8 && stompClient8) {
        var chatMessage8 = {
            sender: username8,
            content: messageInput8.value,
            type: 'CHAT'
        };

        stompClient8.send("/app/chateight.sendMessage", {}, JSON.stringify(chatMessage8));
        messageInput8.value = '';
    }
    event.preventDefault();
}


function onMessageReceived8(payload) {
    var message8 = JSON.parse(payload.body);

    var messageElement8 = document.createElement('li');

    if(message8.type === 'JOIN') {
        messageElement8.classList.add('event-message');
        message8.content = message8.sender + ' joined!';
    } else if (message8.type === 'LEAVE') {
        messageElement8.classList.add('event-message');
        message8.content = message8.sender + ' left!';
    } else {
        messageElement8.classList.add('chat-message');

        var avatarElement8 = document.createElement('i');
        var avatarText8 = document.createTextNode(message8.sender[0]);
        avatarElement8.appendChild(avatarText8);
        avatarElement8.style['background-color'] = getAvatarColor8(message8.sender);

        messageElement8.appendChild(avatarElement8);

        var usernameElement8 = document.createElement('span');
        var usernameText8 = document.createTextNode(message8.sender);
        usernameElement8.appendChild(usernameText8);
        messageElement8.appendChild(usernameElement8);
    }

    var textElement8 = document.createElement('p');
    var messageText8 = document.createTextNode(message8.content);
    textElement8.appendChild(messageText8);

    messageElement8.appendChild(textElement8);

    messageArea8.appendChild(messageElement8);
    messageArea8.scrollTop = messageArea8.scrollHeight;
}


function getAvatarColor8(messageSender) {
    var hash8 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash8 = 31 * hash8 + messageSender.charCodeAt(i);
    }

    var index8 = Math.abs(hash8 % colors.length);
    return colors[index8];
}

usernameForm8.addEventListener('submit', connect8, true)
messageForm8.addEventListener('submit', sendMessage8, true)