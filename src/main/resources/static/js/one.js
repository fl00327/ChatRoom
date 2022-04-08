'use strict';

var usernamePage1 = document.querySelector('#username-pageone');
var chatPage1 = document.querySelector('#chat-pageone');
var usernameForm1 = document.querySelector('#usernameFormone');
var messageForm1 = document.querySelector('#messageFormone');
var messageInput1 = document.querySelector('#messageone');
var messageArea1 = document.querySelector('#messageAreaone');
var connectingElement1 = document.querySelector('.connecting');

var stompClient1 = null;
var username1 = null;

var colors = [
    '#2196f3', '#8774cf', '#ee6103', '#d21010',
    '#ffc107', '#d40b51', '#9ef900', '#00faa5'
];


function connect1(event) {
    username1 = document.querySelector('#nameone').value.trim();

    if(username1) {
        usernamePage1.classList.add('hidden');
        chatPage1.classList.remove('hidden');

        var socket1 = new SockJS('/ws');
        stompClient1 = Stomp.over(socket1);

        stompClient1.connect({}, onConnected1, onError1);
    }
    event.preventDefault();
}


function onConnected1() {
    // Subscribe to the Public Topic
    stompClient1.subscribe('/topic/publicone', onMessageReceived1);

    // Tell your username to the server
    stompClient1.send("/app/chatone.addUser",
        {},
        JSON.stringify({sender: username1, type: 'JOIN'})
    )

    connectingElement1.classList.add('hidden');
}


function onError1(error) {
    connectingElement1.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement1.style.color = 'red';
}


function sendMessage1(event) {
    var messageContent1 = messageInput1.value.trim();

    if(messageContent1 && stompClient1) {
        var chatMessage1 = {
            sender: username1,
            content: messageInput1.value,
            type: 'CHAT'
        };

        stompClient1.send("/app/chatone.sendMessage", {}, JSON.stringify(chatMessage1));
        messageInput1.value = '';
    }
    event.preventDefault();
}


function onMessageReceived1(payload) {
    var message1 = JSON.parse(payload.body);

    var messageElement1 = document.createElement('li');

    if(message1.type === 'JOIN') {
        messageElement1.classList.add('event-message');
        message1.content = message1.sender + ' joined!';
    } else if (message1.type === 'LEAVE') {
        messageElement1.classList.add('event-message');
        message1.content = message1.sender + ' left!';
    } else {
        messageElement1.classList.add('chat-message');

        var avatarElement1 = document.createElement('i');
        var avatarText1 = document.createTextNode(message1.sender[0]);
        avatarElement1.appendChild(avatarText1);
        avatarElement1.style['background-color'] = getAvatarColor1(message1.sender);

        messageElement1.appendChild(avatarElement1);

        var usernameElement1 = document.createElement('span');
        var usernameText1 = document.createTextNode(message1.sender);
        usernameElement1.appendChild(usernameText1);
        messageElement1.appendChild(usernameElement1);
    }

    var textElement1 = document.createElement('p');
    var messageText1 = document.createTextNode(message1.content);
    textElement1.appendChild(messageText1);

    messageElement1.appendChild(textElement1);

    messageArea1.appendChild(messageElement1);
    messageArea1.scrollTop = messageArea1.scrollHeight;
}


function getAvatarColor1(messageSender) {
    var hash1 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash1 = 31 * hash1 + messageSender.charCodeAt(i);
    }

    var index1 = Math.abs(hash1 % colors.length);
    return colors[index1];
}

usernameForm1.addEventListener('submit', connect1, true)
messageForm1.addEventListener('submit', sendMessage1, true)
