var pulse = 0;
var interval = 0;
var r = 0;
var temperature =0;



function setup () {
  createCanvas(windowWidth, windowHeight);

  var client = mqtt.connect('mqtt://aeba5ae7:98e21bb6bccdb957@broker.shiftr.io', {
    clientId: 'p5-pulse-interval-gsr'
  });
  console.log('client', client);

  client.on('connect', function () {
    console.log('client has connected!');
    client.subscribe('/pulse/interval');
  });

  client.on('message', function (topic, message) {
    console.log('new message:', topic, message.toString());
    temperature = +message.toString();
    temperature = 10;
  });
}


function draw () {
  background(255);

  //calculate the radius
  var targetR = map(temperature,20,30,20,width/2);
  r = ease(r,targetR);


  //calculate the color
  var amt = map(r,30,width/2,0,1);
  var fromCol = color(255,255,0);
  var toCol = color(255,0,0);
  var col = lerpColor(fromCol, toCol, amt);

  noStroke();
  fill(col);
  ellipse(width/2,height/2,r);
}

function ease (n, target) {
  var easing = 0.05;
  var d = target - n;
  return n + d * easing;
}
