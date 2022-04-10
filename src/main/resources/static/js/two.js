'use strict';

var usernamePage2 = document.querySelector('#username-pagetwo');
var chatPage2 = document.querySelector('#chat-pagetwo');
var usernameForm2 = document.querySelector('#usernameFormtwo');
var messageForm2 = document.querySelector('#messageFormtwo');
var messageInput2 = document.querySelector('#messagetwo');
var messageArea2 = document.querySelector('#messageAreatwo');
var connectingElement2 = document.querySelector('.connecting');

var stompClient2 = null;
var username2 = null;

var colors = [
    '#2196f3', '#8774cf', '#ee6103', '#d21010',
    '#ffc107', '#d40b51', '#9ef900', '#00faa5'
];


function connect2(event) {
    username2 = document.querySelector('#nametwo').value.trim();

    if(username2) {
        usernamePage2.classList.add('hidden');
        chatPage2.classList.remove('hidden');

        var socket2 = new SockJS('/ws');
        stompClient2 = Stomp.over(socket2);

        stompClient2.connect({}, onConnected2, onError2);
    }
    event.preventDefault();
}


function onConnected2() {
    // Subscribe to the Public Topic
    stompClient2.subscribe('/topic/publictwo', onMessageReceived2);

    // Tell your username to the server
    stompClient2.send("/app/chattwo.addUser",
        {},
        JSON.stringify({sender: username2, type: 'JOIN'})
    )

    connectingElement2.classList.add('hidden');
}


function onError2(error) {
    connectingElement2.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement2.style.color = 'red';
}


function sendMessage2(event) {
    var messageContent2 = messageInput2.value.trim();

    if(messageContent2 && stompClient2) {
        var chatMessage2 = {
            sender: username2,
            content: messageInput2.value,
            type: 'CHAT'
        };

        stompClient2.send("/app/chattwo.sendMessage", {}, JSON.stringify(chatMessage2));
        messageInput2.value = '';
    }
    event.preventDefault();
}


function onMessageReceived2(payload) {
    var message2 = JSON.parse(payload.body);

    var messageElement2 = document.createElement('li');

    if(message2.type === 'JOIN') {
        messageElement2.classList.add('event-message');
        message2.content = message2.sender + ' joined!';
    } else if (message2.type === 'LEAVE') {
        messageElement2.classList.add('event-message');
        message2.content = message2.sender + ' left!';
    } else {
        messageElement2.classList.add('chat-message');

        var avatarElement2 = document.createElement('i');
        var avatarText2 = document.createTextNode(message2.sender[0]);
        avatarElement2.appendChild(avatarText2);
        avatarElement2.style['background-color'] = getAvatarColor2(message2.sender);

        messageElement2.appendChild(avatarElement2);

        var usernameElement2 = document.createElement('span');
        var usernameText2 = document.createTextNode(message2.sender);
        usernameElement2.appendChild(usernameText2);
        messageElement2.appendChild(usernameElement2);
    }

    var textElement2 = document.createElement('p');
    var messageText2 = document.createTextNode(message2.content);
    textElement2.appendChild(messageText2);

    messageElement2.appendChild(textElement2);

    messageArea2.appendChild(messageElement2);
    messageArea2.scrollTop = messageArea2.scrollHeight;
}


function getAvatarColor2(messageSender) {
    var hash2 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash2 = 31 * hash2 + messageSender.charCodeAt(i);
    }

    var index2 = Math.abs(hash2 % colors.length);
    return colors[index2];
}

usernameForm2.addEventListener('submit', connect2, true)
messageForm2.addEventListener('submit', sendMessage2, true)