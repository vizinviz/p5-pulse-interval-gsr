var temperature = 0;
var r = 0;



function setup () {
  createCanvas(windowWidth, windowHeight);

  var client = mqtt.connect('mqtt://aeba5ae7:98e21bb6bccdb957@broker.shiftr.io', {
    clientId: 'vizinviz-simple-circle'
  });
  console.log('client', client);

  client.on('connect', function () {
    console.log('client has connected!');
    client.subscribe('/temperature');
  });

  client.on('message', function (topic, message) {
    console.log('new message:', topic, message.toString());
    temperature = +message.toString();

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
