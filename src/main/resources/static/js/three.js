'use strict';

var usernamePage3 = document.querySelector('#username-pagethree');
var chatPage3 = document.querySelector('#chat-pagethree');
var usernameForm3 = document.querySelector('#usernameFormthree');
var messageForm3 = document.querySelector('#messageFormthree');
var messageInput3 = document.querySelector('#messagethree');
var messageArea3 = document.querySelector('#messageAreathree');
var connectingElement3 = document.querySelector('.connecting');

var stompClient3 = null;
var username3 = null;

var colors = [
    '#b32c95', '#8774cf', '#ee6103', '#4ad210',
    '#f5cb32', '#0bd4c3', '#d71616', '#00faa5'
];


function connect3(event) {
    username3 = document.querySelector('#namethree').value.trim();

    if(username3) {
        usernamePage3.classList.add('hidden');
        chatPage3.classList.remove('hidden');

        var socket3 = new SockJS('/ws');
        stompClient3 = Stomp.over(socket3);

        stompClient3.connect({}, onConnected3, onError3);
    }
    event.preventDefault();
}


function onConnected3() {
    // Subscribe to the Public Topic
    stompClient3.subscribe('/topic/publicthree', onMessageReceived3);

    // Tell your username to the server
    stompClient3.send("/app/chatthree.addUser",
        {},
        JSON.stringify({sender: username3, type: 'JOIN'})
    )

    connectingElement3.classList.add('hidden');
}


function onError3(error) {
    connectingElement3.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement3.style.color = 'red';
}


function sendMessage3(event) {
    var messageContent3 = messageInput3.value.trim();

    if(messageContent3 && stompClient3) {
        var chatMessage3 = {
            sender: username3,
            content: messageInput3.value,
            type: 'CHAT'
        };

        stompClient3.send("/app/chatthree.sendMessage", {}, JSON.stringify(chatMessage3));
        messageInput3.value = '';
    }
    event.preventDefault();
}


function onMessageReceived3(payload) {
    var message3 = JSON.parse(payload.body);

    var messageElement3 = document.createElement('li');

    if(message3.type === 'JOIN') {
        messageElement3.classList.add('event-message');
        message3.content = message3.sender + ' joined!';
    } else if (message3.type === 'LEAVE') {
        messageElement3.classList.add('event-message');
        message3.content = message3.sender + ' left!';
    } else {
        messageElement3.classList.add('chat-message');

        var avatarElement3 = document.createElement('i');
        var avatarText3 = document.createTextNode(message3.sender[0]);
        avatarElement3.appendChild(avatarText3);
        avatarElement3.style['background-color'] = getAvatarColor3(message3.sender);

        messageElement3.appendChild(avatarElement3);

        var usernameElement3 = document.createElement('span');
        var usernameText3 = document.createTextNode(message3.sender);
        usernameElement3.appendChild(usernameText3);
        messageElement3.appendChild(usernameElement3);
    }

    var textElement3 = document.createElement('p');
    var messageText3 = document.createTextNode(message3.content);
    textElement3.appendChild(messageText3);

    messageElement3.appendChild(textElement3);

    messageArea3.appendChild(messageElement3);
    messageArea3.scrollTop = messageArea3.scrollHeight;
}


function getAvatarColor3(messageSender) {
    var hash3 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash3 = 31 * hash3 + messageSender.charCodeAt(i);
    }

    var index3 = Math.abs(hash3 % colors.length);
    return colors[index3];
}

usernameForm3.addEventListener('submit', connect3, true)
messageForm3.addEventListener('submit', sendMessage3, true)