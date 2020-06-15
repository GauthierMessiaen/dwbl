/*
 * This Object is the abstraction of the drawing robot scenario.
 * It handles the layout and behaviour of a certain simulator scenario.
 * It provides a step function which uses and updates the state of the dwenguino board.
 *
 */
function DwenguinoSimulationScenarioDrawingRobot(){
  if (!(this instanceof DwenguinoSimulationScenarioDrawingRobot)){
    return new DwenguinoSimulationScenarioDrawingRobot();
  }

  //call super prototype
  DwenguinoSimulationScenario.call(this);
  //init robot state
  this.initSimulationState();
}


/* @brief Initializes the simulator robot.
 * This resets the simulation state.
 *
 * @param containerIdSelector The jquery selector of the conainer to put the robot display.
 *
 */
DwenguinoSimulationScenarioDrawingRobot.prototype.initSimulationState = function(containerIdSelector){
  DwenguinoSimulationScenario.prototype.initSimulationState.call(this);

  /* Changes to settings -> change values in the following funtions
   * DwenguinoSimulationScenarioDrawingRobot.js
   *    getPosition, getLength, getCurrentLength
   * DwenguinoSimulation.js
   *    stepMotorRotate
  */
  this.motor = {
    image: {
      radius: 10,
    },
    position: {
      xL: 20,
      xR: 400,
      y: 20
    },
    settings: {
      nrOfSteps: 200,
      currentStepsL:0,
      currentStepsR:0,
      // stepsL: [],
      // stepsR: [],
      // steps: []
    }
  };

  this.stylus = {
    image: {
      radius: 5,
      // color: "#000"
    },
    position: {
      x: (this.motor.position.xR-this.motor.position.xL)/2 + this.motor.position.xL,
      y: 80
    },
    prevPosition: {
      x: 0,
      y: 0
    },
    drawing: {
      radius: 2,
      drawingColor: "#000",
      selectedColor:"#000",
      boardColor: "#000",
      liftStylus: false,
      // angles: [],
      // colors: []
    }
  };

  this.line = {
    lengthL: Math.sqrt(Math.pow(this.stylus.position.x - this.motor.position.xL,2) + Math.pow(this.stylus.position.y - this.motor.position.y,2)),
    lengthR: Math.sqrt(Math.pow(this.motor.position.xR - this.stylus.position.x,2) + Math.pow(this.motor.position.y - this.stylus.position.y,2)),
    lengthBase: Math.sqrt(Math.pow(this.motor.position.xR - this.stylus.position.x,2) + Math.pow(this.motor.position.y - this.stylus.position.y,2))
  };

  this.paper = {
    height: (this.motor.position.xR - this.motor.position.xL) / Math.sqrt(2), // height = width * sqrt(2) -> aspect ractio of a3
    width: this.motor.position.xR - this.motor.position.xL,
    position: {
      x: this.motor.position.xL,
      y: 40
    }
  };

  this.containerWidth = 0;
  this.containerHeight = 0;

}

/* @brief Initializes the simulator robot display.
 * This function puts all the nececary visuals inside the container with the id containerId.
 * Additionally, it sets up the state of the simulated robot.
 *
 * @param containerId The id of the conainer to put the robot display.
 *
 */
DwenguinoSimulationScenarioDrawingRobot.prototype.initSimulationDisplay = function(containerIdSelector){
  // init superclass
  DwenguinoSimulationScenario.prototype.initSimulationDisplay.call(this);

  // Reset the simulation state
  this.initSimulationState();

  //Init the display elements
  var container = $(containerIdSelector);
  var simulationContainer = $("<div>").attr("id", "sim_container");

  //Add resize listerner to the conainer and update width and height accordingly
  var self = this;
  new ResizeSensor(simulationContainer, function() {
     console.log('myelement has been resized');
     self.containerWidth = simulationContainer.width();
     self.containerHeight = simulationContainer.height();
 });

  //Add canvas for robot
  simulationContainer.append($("<canvas>").attr("id", "sim_canvas").attr("class","canvas"));
  //Add canvas for drawing
  simulationContainer.append($("<canvas>").attr("id", "sim_canvas_drawing").attr("class","canvas"));
  //Add canvas for grid
  simulationContainer.append($("<canvas>").attr("id", "sim_canvas_grid").attr("class","canvas"));
  //Add div for grid
  simulationContainer.append($("<div>").attr("id", "sim_grid"));



  var coord = $("<div>").attr("id","coordinates").text(MSG.currentCoordinates + ": (190,40)");
  simulationContainer.append(coord);



  //Add ul for simulation settings
  var settings = $("<ul>").attr("id", "sim_settings");
  //simulation settings
  //  grid checkbox
  var item = $('<li>').attr("class","sim_setting");
  $('<input />', { type: 'checkbox', id: 'cb_grid', value: "grid" }).prop('checked', true).appendTo(item);
  $('<label />', { 'for': 'cb_grid', id: 'txt_grid', text: MSG.drawingrobotgrid }).appendTo(item);
  settings.append(item);
  //  color picker
  var item = $('<li>').attr("class","sim_setting");
  if($("#colorpicker") !== undefined){
    this.stylus.drawing.drawingColor = $("#colorpicker").val();
    // this.stylus.drawing.selectedColor = $("#colorpicker").val();
  }
  $('<input />', { type: 'color', id: 'colorpicker', name:"colorpicker", value: this.stylus.drawing.drawingColor }).appendTo(item);
  $('<label />', { 'for': 'colorpicker', id: 'txt_colorpicker', text: MSG.colorpicker }).appendTo(item);
  settings.append(item);
  //  save image button
  var item = $('<li>').attr("class","sim_setting");
  $('<button />', { type: 'button', id: 'btn_saveImage', text: MSG.drawingrobotSaveImage }).appendTo(item);
  settings.append(item);


  simulationContainer.append(settings);


  container.empty();
  container.append(simulationContainer);

  //select canvas
  var canvas = $('#sim_canvas')[0];
  var canvas_drawing = $('#sim_canvas_drawing')[0];
  var canvas_grid = $('#sim_canvas_grid')[0];

  // Set new element styles
  $(containerIdSelector).css("position", "relative");

  $("#sim_container")
   .css("position", "relative")
   .css("width", "100%")
   .css("height", "100%")
   .css("box-sizing", "border-box");


  $(".canvas")
   .css("position","absolute")
   .css("top", "O")
   .css("left", "O");
  
  $("#sim_settings")
    .css("position","absolute")
    .css("right","20px")
    .css("top","0px")
    .css("list-style","none");
  
  
  $("#sim_grid")
    .css("position","absolute")
    .css("left",this.paper.position.x)
    .css("top",this.paper.position.y)
    .css("width",this.paper.width)
    .css("height",this.paper.height);
    
  $(".sim_setting").css("vertical-align","middle");
   //Save the dimensions of the container
   this.containerWidth = simulationContainer.width();
   this.containerHeight = simulationContainer.height();

  canvas.width = this.containerWidth;
  canvas.height = this.containerHeight;
  canvas_drawing.width = this.containerWidth;
  canvas_drawing.height = this.containerHeight;
  canvas_grid.width = this.containerWidth;
  canvas_grid.height = this.containerHeight;


  this.drawGrid();
  
  $('#cb_grid').click(function() {
    $("#svg_grid").toggle(this.checked);
    $("#sim_canvas_grid").toggle(this.checked);
  });

  $('#btn_saveImage').click(function() {
    var canvas = $('#sim_canvas_drawing')[0];
    var MIME_TYPE = "image/png";
    var image = canvas.toDataURL(MIME_TYPE);
    
    var dlLink = document.createElement('a');
    dlLink.download = MSG.drawingrobotDrawing;
    dlLink.href = image;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  });
  

  DwenguinoSimulationScenarioDrawingRobot.prototype.redraw(this);  
};

/* @brief updates the simulation state and display
 * This function updates the simulation state and display using the supplied board state.
 *
 * @param boardState The state of the Dwenguino board.
 * @return The updated Dwenguino board state.
 *
 */
DwenguinoSimulationScenarioDrawingRobot.prototype.updateScenario = function(dwenguinoState){
  DwenguinoSimulationScenario.prototype.updateScenario.call(this, dwenguinoState);
  var newScenarioState = this.updateScenarioState(dwenguinoState);
  this.updateScenarioDisplay(dwenguinoState);
  return dwenguinoState;
};


/* @brief updates the simulation state
 * This function updates the simulation state using the supplied board state.
 *
 * @param boardState The state of the Dwenguino board.
 * @return The updated Dwenguino board state.
 *
 */
DwenguinoSimulationScenarioDrawingRobot.prototype.updateScenarioState = function(dwenguinoState){
  DwenguinoSimulationScenario.prototype.updateScenarioState.call(this, dwenguinoState);
  // if($("#colorpicker") !== undefined){
  //   this.stylus.drawing.color = $("#colorpicker").val();
  // }
  // $('#colorpicker').change(function() {
  //   dwenguinoState = $("#colorpicker").val();
  // });

  if( this.checkServoAngle(dwenguinoState.servoAngles[0], this) ){
    this.updateServoAngle(dwenguinoState.servoAngles[0], this );
  }
  
  this.updateColor(dwenguinoState.color, $("#colorpicker").val(), this );
  

  var stepL = dwenguinoState.motorSteps[0];
  var stepR = dwenguinoState.motorSteps[1];

  if(stepL !== this.motor.settings.currentStepsL || stepR !==this.motor.settings.currentStepsR){
    this.motor.settings.currentStepsL = stepL;
    this.motor.settings.currentStepsR = stepR;

    this.line.lengthL = stepL + this.line.lengthBase;
    this.line.lengthR = stepR + this.line.lengthBase;
    var position = this.getPosition(this.line.lengthL, this.line.lengthR);
    this.stylus.prevPosition.x = this.stylus.position.x;
    this.stylus.prevPosition.y = this.stylus.position.y;
    this.stylus.position.x = position[0];
    this.stylus.position.y = position[1];
  }



  
  return dwenguinoState;
};

/* @brief updates the simulation display
 * This function updates the simulation display using the supplied board state.
 *
 * @param boardState The state of the Dwenguino board.
 *
 */
DwenguinoSimulationScenarioDrawingRobot.prototype.updateScenarioDisplay = function(dwenguinoState){
  DwenguinoSimulationScenario.prototype.updateScenarioDisplay.call(this, dwenguinoState);
  DwenguinoSimulationScenarioDrawingRobot.prototype.redraw(this);
};



/* @brief calculates point for stylus
 * This function find the intersection between 2 circles.
 * Circle 1 is a circle where the center=motorL and radius=length to stylus
 * Circle 2 is the same, but with motorR
 * *
 * @return The first point of intersection (the second point is outside the drawing zone)
 *
 */
DwenguinoSimulationScenarioDrawingRobot.prototype.calculatePoint = function(r1, x1, y1, r2, x2, y2){
  var d = x2 - x1;
  var a = (Math.pow(r1,2) - Math.pow(r2,2) + Math.pow(d,2)) / (2*d);
  var h = Math.sqrt( Math.pow(r1,2) - Math.pow(a,2) );

  var x3 = x1 + (a/d) * (x2-x1);
  var y3 = y1 + (a/d) * (y2-y1);
  

  var x4a = x3 - (h/d) * (y2-y1);
  var y4a = y3 + (h/d) * (x2-x1);

  var x4b = x3 + (h/d) * (y2-y1);
  var y4b = y3 - (h/d) * (x2-x1);
  return [x4a,y4a];
};

DwenguinoSimulationScenarioDrawingRobot.prototype.redraw = function(state){
  var canvas = $('#sim_canvas')[0];
  ctx = canvas.getContext('2d');

  var canvas_drawing = $('#sim_canvas_drawing')[0];
  ctx_drawing = canvas_drawing.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw lines
  ctx.beginPath();
  ctx.strokeStyle = "#848484";
  ctx.moveTo(state.motor.position.xL,state.motor.position.y);
  ctx.lineTo(state.stylus.position.x,state.stylus.position.y);
  ctx.moveTo(state.motor.position.xR,state.motor.position.y);
  ctx.lineTo(state.stylus.position.x,state.stylus.position.y);
  ctx.stroke();

  //draw stylus
  ctx.beginPath();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = state.stylus.drawing.drawingColor;
  ctx.arc(state.stylus.position.x,state.stylus.position.y,state.stylus.image.radius,0,2*Math.PI);
  ctx.fill();

  //draw motorL
  ctx.beginPath();
  ctx.fillStyle = "#848484";
  ctx.arc(state.motor.position.xL,state.motor.position.y,state.motor.image.radius,0,2*Math.PI);
  ctx.fill();

  //draw motorL
  ctx.beginPath();
  ctx.fillStyle = "#848484";
  ctx.arc(state.motor.position.xR,state.motor.position.y,state.motor.image.radius,0,2*Math.PI);
  ctx.fill();

  //draw drawing
  if(!state.stylus.drawing.liftStylus){ //only draw if the sylus is not lifted
    ctx_drawing.beginPath();
    ctx_drawing.fillStyle = state.stylus.drawing.drawingColor;
    ctx_drawing.arc(state.stylus.position.x,state.stylus.position.y,state.stylus.drawing.radius,0,2*Math.PI);
    ctx_drawing.fill();
  }

  var x = Math.round(Number(state.stylus.position.x),0)-20;
  var y = Math.round(Number(state.stylus.position.y),0)-40;
  $("#coordinates").text(MSG.currentCoordinates + ": (" + x + "," + y + ")")
}

DwenguinoSimulationScenarioDrawingRobot.prototype.drawGrid = function(){
  var x = this.paper.position.x;
  var y = this.paper.position.y;
  var canvas = $('#sim_canvas_grid')[0];
  ctx = canvas.getContext('2d');
  ctx.font = "10px Arial";
  // ctx.fillStyle = "#000";
  ctx.fillText("0", x, y);
  ctx.fillText("100", x+100, y);
  ctx.fillText("200", x+200, y);
  ctx.fillText("300", x+300, y);

  ctx.fillText("100", x-15, y+100);
  ctx.fillText("200", x-15, y+200);
  ctx.fillText("300", x-15, y+300);


  var data = '\
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" id="svg_grid">\
    <defs>\
      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">\
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>\
      </pattern>\
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">\
        <rect width="100" height="100" fill="url(#smallGrid)"/>\
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>\
      </pattern>\
    </defs>\
    <rect width="100%" height="100%" fill="url(#grid)" />\
  </svg>';

  $("#sim_grid").append(data);

};

DwenguinoSimulationScenarioDrawingRobot.prototype.getPosition = function(L,R){
  dw = new DwenguinoSimulationScenarioDrawingRobot();
  var xMotorL = dw.motor.position.xL;
  var xMotorR = dw.motor.position.xR;
  var yMotor = dw.motor.position.y;

  var position = DwenguinoSimulationScenarioDrawingRobot.prototype.calculatePoint(L,xMotorL, yMotor, R, xMotorR, yMotor);
  
  return position;
}

DwenguinoSimulationScenarioDrawingRobot.prototype.getCurrentPosition = function(){
  var LR = DwenguinoSimulationScenarioDrawingRobot.prototype.getCurrentLength();
  var L = LR[0];
  var R = LR[1];

  var position = DwenguinoSimulationScenarioDrawingRobot.prototype.getPosition(L, R);
  
  return position;
};

DwenguinoSimulationScenarioDrawingRobot.prototype.getCurrentLength = function(){
  dw = new DwenguinoSimulationScenarioDrawingRobot();
  var xMotorL = dw.motor.position.xL;
  var xMotorR = dw.motor.position.xR;
  var yMotor = dw.motor.position.y;
  var xStylus = (xMotorR-xMotorL)/2 + xMotorL;
  var yStylus = dw.stylus.position.y;

  var lengthBase = Math.sqrt(Math.pow(xMotorR - xStylus,2) + Math.pow(yMotor - yStylus,2)); 
  var stepsL = DwenguinoSimulation.board.motorSteps[0];
  var stepsR = DwenguinoSimulation.board.motorSteps[1];

  var L = lengthBase + stepsL;
  var R = lengthBase + stepsR;

  return [L,R];

};

DwenguinoSimulationScenarioDrawingRobot.prototype.getLength = function(x,y){
  dw = new DwenguinoSimulationScenarioDrawingRobot();
  var xMotorL = dw.motor.position.xL;
  var xMotorR = dw.motor.position.xR;
  var yMotor = dw.motor.position.y;

  L = Math.sqrt(Math.pow(x - xMotorL,2) + Math.pow(y - yMotor,2)); 
  R = Math.sqrt(Math.pow(xMotorR - x,2) + Math.pow(yMotor - y,2));

  return [L,R];
}

DwenguinoSimulationScenarioDrawingRobot.prototype.updateServoAngle = function(angle, state){
  if(angle === 90){
    state.stylus.drawing.liftStylus = true;
  }
  if(angle === 0){
    state.stylus.drawing.liftStylus = false;
  }
}

DwenguinoSimulationScenarioDrawingRobot.prototype.checkServoAngle = function(angle, state){
  if(angle === 90 && state.stylus.drawing.liftStylus){
    return false;
  } else if( angle === 0 && !state.stylus.drawing.liftStylus ){
    return false;
  } else {
    return true;
  }
}

DwenguinoSimulationScenarioDrawingRobot.prototype.updateColor = function(c1, c2, state){

  // console.log( "c1: " + c1);
  // console.log( "board: " + state.stylus.drawing.boardColor);
  // console.log( "c2: " + c2);
  // console.log( "picker: " + state.stylus.drawing.selectedColor);
  // Color block used
  if(c1 !== state.stylus.drawing.boardColor ){
    state.stylus.drawing.drawingColor = c1;
    state.stylus.drawing.boardColor = c1;
  }

  // Colorpicker used
  if(c2 !== state.stylus.drawing.selectedColor ){
    state.stylus.drawing.drawingColor = c2;
    state.stylus.drawing.selectedColor = c2;
  }
}
