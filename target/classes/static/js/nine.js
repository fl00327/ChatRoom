'use strict';

var usernamePage9 = document.querySelector('#username-pagenine');
var chatPage9 = document.querySelector('#chat-pagenine');
var usernameForm9 = document.querySelector('#usernameFormnine');
var messageForm9 = document.querySelector('#messageFormnine');
var messageInput9 = document.querySelector('#messagenine');
var messageArea9 = document.querySelector('#messageAreanine');
var connectingElement9 = document.querySelector('.connecting');

var stompClient9 = null;
var username9 = null;

var colors = [
    '#2c69b3', '#7e68cd', '#269f51', '#269f51',
    '#a9891d', '#2a9d94', '#379f33', '#2f924b'
];

function connect9(event) {
    username9 = document.querySelector('#namenine').value.trim();

    if(username9) {
        usernamePage9.classList.add('hidden');
        chatPage9.classList.remove('hidden');

        var socket9 = new SockJS('/ws');
        stompClient9 = Stomp.over(socket9);

        stompClient9.connect({}, onConnected9, onError9);
    }
    event.preventDefault();
}


function onConnected9() {
    // Subscribe to the Public Topic
    stompClient9.subscribe('/topic/publicnine', onMessageReceived9);

    // Tell your username to the server
    stompClient9.send("/app/chatnine.addUser",
        {},
        JSON.stringify({sender: username9, type: 'JOIN'})
    )

    connectingElement9.classList.add('hidden');
}


function onError9(error) {q
    connectingElement9.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement9.style.color = 'red';
}


function sendMessage9(event) {
    var messageContent9 = messageInput9.value.trim();

    if(messageContent9 && stompClient9) {
        var chatMessage9 = {
            sender: username9,
            content: messageInput9.value,
            type: 'CHAT'
        };

        stompClient9.send("/app/chatnine.sendMessage", {}, JSON.stringify(chatMessage9));
        messageInput9.value = '';
    }
    event.preventDefault();
}


function onMessageReceived9(payload) {
    var message9 = JSON.parse(payload.body);
    let checking = null;

    var messageElement9 = document.createElement('li');

    if(message9.type === 'JOIN') {
        messageElement9.classList.add('event-message');
        message9.content = 'Hello ' + message9.sender;
    } else if (message9.type === 'LEAVE') {
        messageElement9.classList.add('event-message');
        message9.content = message9.sender + ' left!';
    } else {
        messageElement9.classList.add('chat-message');

        var avatarElement9 = document.createElement('i');
        var avatarText9 = document.createTextNode(message9.sender[0]);
        avatarElement9.appendChild(avatarText9);
        avatarElement9.style['background-color'] = getAvatarColor9(message9.sender);

        messageElement9.appendChild(avatarElement9);

        var usernameElement9 = document.createElement('span');
        var usernameText9 = document.createTextNode(message9.sender);
        usernameElement9.appendChild(usernameText9);
        messageElement9.appendChild(usernameElement9);
        checking = true;
    }


    var textElement9 = document.createElement('p');
    var messageText9 = document.createTextNode(message9.content);

    var messageElementBot = document.createElement('li');
    messageElementBot.classList.add('chat-message');
    var avatarElementBot = document.createElement('i');
    var avatarTextBot = document.createTextNode("B");
    avatarElementBot.appendChild(avatarTextBot);
    avatarElementBot.style['background-color'] = getAvatarColor9("Bot");
    messageElementBot.appendChild(avatarElementBot);

    var usernameElementBot = document.createElement('span');
    var usernameTextBot = document.createTextNode("Bot");
    usernameElementBot.appendChild(usernameTextBot);
    messageElementBot.appendChild(usernameElementBot);

    var textElementBot = document.createElement('p');
    var messageTextBot = null;




    var finalmessage = message9.content;
    let lowMessage = finalmessage.toLowerCase();

    var pizza = "Eat lots of Pizza!!!";
    var unibpt = "I think people call me UniBot"
    var gym = "I am preparing to go to the Gym";
    var movie = "My Favourite Movie is The Matrix";
    var hello = "Hello :D";
    var hi = "Hi, How are you!!!";
    var goodtoKnow = "That make me happy, hope you have a good day"
    var autoReply = "What do you mean by that";
    var monday = "Monday";
    var tuesday = "Tuesday";
    var wednesday = "Wednesday";
    var thursday = "Thursday";
    var friday = "Friday";
    var saturday = "Saturday";
    var sunday = "Sunday";
    var help = "My Job is to help you";
    var whatmental = "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act.";
    var mentalHealth = "You should contact your GP or NHS (111)\nIf You need to talk to someone in the night, there is a nightline service provided by the University Of Surrey's SU.";
    var pi = "The value of pi is 2.141592653589793238462643383279";
    var aging = "I am 0-1 years old :D";
    var human = "I think I am Binary!!";
    var joke = "Hear about the new restaurant called Karma?\n" +
        "There’s no menu: You get what you deserve.";
    var marry = "That is not possible,  or is it?";
    var whatsup = "Hey You, I hope you have a Good Day today!!"
    var suggest = "The Fugitive";
    var favYou = "My Favourite Youtuber is @MKBHD";
    var favclub = "My Favourite Club is @PSG";
    var tip = "There is always light. If only we're brave enough to see it. If only we're brave enough to be it.";
    var birth = "Happy Birthday, Have an amazing day!!";
    var made = "I was made by Marsboy";
    var boris = "Boris Johnson";
    var biden = "Joe biden";
    var roboting = "Yes I am a robot, but I'm a good one. Let me prove it. How can I help you?";
    var asia = "Pakistan is in Asia";
    var london = "I am from London";
    var hug = "😘 🫂";
    var loving = "Baby don’t hurt me, don’t hurt me, no more!";
    var talking = "Does talking to you count?";
    var sleep = "Okay. I didn’t want to do this but you leave me no choice. \n" +
        "Start counting. \n" +
        "1, 2, 3, 4 --- Are you sleep yet!!!";
    var yes = "Yes I know";
    var no = "No No No Oh Oh";
    var fuck = "I thought we were friends, but still I wont hold that against you!"
    var gooding = "I am having the time of my life, but a little worrying the server is heating up!!"
    var russia = "Russia is in Russia :)"


    if(lowMessage.includes("what")){
        if(lowMessage.includes("should i do")){
            messageTextBot = document.createTextNode(pizza);
        }else if(lowMessage.includes("is your name")){
            messageTextBot = document.createTextNode(unibpt);
        }else if(lowMessage.includes("will you do today")){
            messageTextBot = document.createTextNode(gym);
        }else if(lowMessage.includes("are you doing")){
            messageTextBot = document.createTextNode(gym);
        }else if(lowMessage.includes("day")){
            const d = new Date();
            let day = d.getDay()
            if(day == 0){
                messageTextBot = document.createTextNode(sunday);
            }else if(day == 1){
                messageTextBot = document.createTextNode(monday);
            }else if(day == 2){
                messageTextBot = document.createTextNode(tuesday);
            }else if(day == 3){
                messageTextBot = document.createTextNode(wednesday);
            }else if(day == 4){
                messageTextBot = document.createTextNode(thursday);
            }else if(day == 5){
                messageTextBot = document.createTextNode(friday);
            }else if(day == 6){
                messageTextBot = document.createTextNode(saturday);
            }

        }else if(lowMessage.includes("favourite movie")){
            messageTextBot = document.createTextNode(movie);
        }else if(lowMessage.includes("do you do")){
            messageTextBot = document.createTextNode(help);
        }else if(lowMessage.includes("mental health")){
            messageTextBot = document.createTextNode(whatmental);
        }else if(lowMessage.includes("value pi")){
            messageTextBot = document.createTextNode(pi);
        }else if(lowMessage.includes("is your age")){
            messageTextBot = document.createTextNode(aging);
        }else if(lowMessage.includes("is love")){
            messageTextBot = document.createTextNode(loving);
        }else if(lowMessage.includes("favourite club")){
            messageTextBot = document.createTextNode(favclub);
        }else if(lowMessage.includes("up")){
            messageTextBot = document.createTextNode(whatsup);
        } else{
            messageTextBot = document.createTextNode(autoReply);
        }

    }else if(lowMessage.includes("nothing")){
        messageTextBot = document.createTextNode(autoReply);
    }else if(lowMessage.includes("hi")){
        messageTextBot = document.createTextNode(hi);
    }else if(lowMessage.includes("i am good")){
        messageTextBot = document.createTextNode(goodtoKnow);
    } else if(lowMessage.includes("hello")){
        messageTextBot = document.createTextNode(hello);
    }else if(lowMessage.includes("are you human")){
        messageTextBot = document.createTextNode(human);
    }else if(lowMessage.includes("are you a robot")){
        messageTextBot = document.createTextNode(roboting);
    } else if(lowMessage.includes("tip of the day")){
        messageTextBot = document.createTextNode(tip);
    }else if(lowMessage.includes("is birthday")){
        messageTextBot = document.createTextNode(birth);
    }else if(lowMessage.includes("who")){
        if(lowMessage.includes("made you")){
            messageTextBot = document.createTextNode(made);
        }else if(lowMessage.includes("prime")){
            messageTextBot = document.createTextNode(boris);
        }else if(lowMessage.includes("is the president of usa")){
            messageTextBot = document.createTextNode(biden);
        }else if(lowMessage.includes("favourite youtuber")){
            messageTextBot = document.createTextNode(favYou);
        } else{
            messageTextBot = document.createTextNode(autoReply);
        }
    }else if(lowMessage.includes("mental health advice")){
        messageTextBot = document.createTextNode(mentalHealth);
    }else if(lowMessage.includes("joke")){
        messageTextBot = document.createTextNode(joke);
    }else if(lowMessage.includes("marry")){
        messageTextBot = document.createTextNode(marry);
    }else if(lowMessage.includes("can")){
        if(lowMessage.includes("suggest movie")){
            messageTextBot = document.createTextNode(suggest);
        }else if(lowMessage.includes("joke")){
            messageTextBot = document.createTextNode(joke);
        }else{
            messageTextBot = document.createTextNode(autoReply);
        }
    }else if(lowMessage.includes("where")){
        if(lowMessage.includes("do you live")){
            messageTextBot = document.createTextNode(london);
        }else if(lowMessage.includes("are you from")){
            messageTextBot = document.createTextNode(london);
        }else if(lowMessage.includes("is pakistan")){
            messageTextBot = document.createTextNode(asia);
        }else if(lowMessage.includes("is russia")){
            messageTextBot = document.createTextNode(russia);
        }
        else{
            messageTextBot = document.createTextNode(autoReply);
        }
    }else if(lowMessage.includes("hug")){
        messageTextBot = document.createTextNode(hug);
    }else if(lowMessage.includes("hobbies")){
        messageTextBot = document.createTextNode(talking);
    }else if(lowMessage.includes("sleep")){
        messageTextBot = document.createTextNode(sleep);
    }else if(lowMessage.includes("fuck")){
        messageTextBot = document.createTextNode(fuck);
    }else if(lowMessage.includes("asshole")){
        messageTextBot = document.createTextNode(fuck);
    }else if(lowMessage.includes("donkey")){
        messageTextBot = document.createTextNode(fuck);
    }else if(lowMessage.includes("motherfucker")){
        messageTextBot = document.createTextNode(fuck);
    }else if(lowMessage.includes("sex")){
        messageTextBot = document.createTextNode(fuck);
    }else if(lowMessage.includes("yes")){
        messageTextBot = document.createTextNode(yes);
    }else if(lowMessage.includes("no")){
        messageTextBot = document.createTextNode(no);
    }else if(lowMessage.includes("how are you")){
        messageTextBot = document.createTextNode(gooding);
    }else if(lowMessage.includes("i can't sleep")){
        messageTextBot = document.createTextNode(sleep);
    } else{
        messageTextBot = document.createTextNode(autoReply);
    }

    textElementBot.appendChild(messageTextBot)
    messageElementBot.appendChild(textElementBot)



    textElement9.appendChild(messageText9);
    messageElement9.appendChild(textElement9);

    messageArea9.appendChild(messageElement9);

    if(checking == true){
        messageArea9.appendChild(messageElementBot);
    }

    messageArea9.scrollTop = messageArea9.scrollHeight;
}


function getAvatarColor9(messageSender) {
    var hash9 = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash9 = 31 * hash9 + messageSender.charCodeAt(i);
    }

    var index9 = Math.abs(hash9 % colors.length);
    return colors[index9];
}

usernameForm9.addEventListener('submit', connect9, true)
messageForm9.addEventListener('submit', sendMessage9, true)