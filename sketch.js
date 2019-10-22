var pulse = 0;
var interval = 0;
var gsr = 0;



function setup () {
  createCanvas(windowWidth, windowHeight);

  var client = mqtt.connect('mqtt://aeba5ae7:98e21bb6bccdb957@broker.shiftr.io', {
    clientId: 'p5-pulse-interval-gsr'
  });
  console.log('client', client);

  client.on('connect', function () {
    console.log('client has connected!');
    client.subscribe('/pulse/interval');
    client.subscribe('/gsr');
  });

  client.on('message', function (topic, message) {
    console.log('new message:', topic, message.toString());
    var msg = message.toString();

    if (topic == '/pulse/interval') {
      var tokens = split(msg, ',');
      pulse = +tokens[0];
      interval = +tokens[1];
    }
    else if (topic == '/gsr') {
      gsr = +msg;
    }

  });
}

function draw () {
  background(255);

  text("Puls: " + pulse, 100, 100);
  text("Interval: " + interval, 100, 120);
  text("GSR: " + gsr, 100, 140);
}


