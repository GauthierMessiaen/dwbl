/**
 * @fileoverview Generating Dwenguino blocks.
 * @author tom.neutens@UGent.be     (Tom Neutens)
 */
'use strict';

goog.provide('Blockly.Arduino.drawingrobot');

goog.require('Blockly.Arduino');


// This is now integrated in the setup loop structure so children don't have to know about the initialisation step and can just start coding
Blockly.Arduino['initdwenguino'] = function (block) {
//    Blockly.Arduino.definitions_['define_wire_h'] = '#include <Wire.h>\n';
//    Blockly.Arduino.definitions_['define_dwenguino_h'] = '#include <Dwenguino.h>\n';
//    Blockly.Arduino.definitions_['define_lcd_h'] = '#include <LiquidCrystal.h>\n';

    //Blockly.Arduino.setups_['initDwenguino'] = 'initDwenguino();';
    //var code = 'initDwenguino();';
    return code;
};

// ----- Algemene functies -----
Blockly.Arduino['drawingrobot_setup'] = function() {
  // Include the Arduino Stepper.h library:
  Blockly.Arduino.definitions_['define_dwenguinosteppermotor_h'] = "#include <Stepper.h>\n";
  // Define number of steps per rotation:
  Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_1'] = 'const int stepsPerRevolution = 2048;\n';
  // Wiring:
  // Pin 8 to IN1 on the ULN2003 driver
  // Pin 9 to IN2 on the ULN2003 driver
  // Pin 10 to IN3 on the ULN2003 driver
  // Pin 11 to IN4 on the ULN2003 driver
  // Create stepper object called 'myStepper', note the pin order:
  Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_1'] = 'Stepper myStepper1 = Stepper(stepsPerRevolution, 8, 10, 9, 11);';
  Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_2'] = 'Stepper myStepper2= Stepper(stepsPerRevolution, 4, 6, 5, 7);\n';
  
  Blockly.Arduino.definitions_['declare_stepcount_on_channel_1'] = 'int stepCount1 = 0;';
  Blockly.Arduino.definitions_['declare_stepcount_on_channel_2'] = 'int stepCount2 = 0;';

  Blockly.Arduino.definitions_['variables'] = 'int steps1 = 0;\nint steps2 = 0;\n'

  Blockly.Arduino.setups_['setSpeed'] = 'myStepper.setSpeed(5);\n  myStepper2.setSpeed(5);\n';
  // Begin Serial communication at a baud rate of 9600:
  Blockly.Arduino.setups_['serial'] = 'Serial.begin(9600);\n';
};

// ----- Blokken -----
Blockly.Arduino['drawingrobot_stepper_motor'] = function(block) {
  Blockly.Arduino['drawingrobot_setup']();

  var value_channel = Blockly.Arduino.valueToCode(block, 'channel', Blockly.Arduino.ORDER_ATOMIC);
  var value_steps = Blockly.Arduino.valueToCode(block, 'step', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''
  + 'bool direction = (' + value_steps + ' >= 0); // true = positive, false = negative\n'
  + 'int startSteps = steps' + value_channel + ';\n'
  + 'int endSteps = 0;\n'
  + 'if(direction){\n'
  + '  endSteps = startSteps + ' + value_steps + ';\n'
  + '} else {\n'
  + '  endSteps = startSteps - ' + value_steps + ';\n'
  + '}\n'
  + 'while (steps' + value_channel + ' != endSteps){\n'
  + '  if(direction){\n'
  + '    myStepper' + value_channel + '.step(1);\n'
  + '    delay(10);\n'
  + '    stepCount' + value_channel + '++;\n'
  + '  } else {\n'
  + '    myStepper' + value_channel + '.step(-1);\n'
  + '    delay(10);\n'
  + '    stepCount' + value_channel + '--;\n'
  + '  }\n'
  + '}\n';

  return code;
}


Blockly.Arduino['drawingrobot_move'] = function(block) {
  // var amount = Blockly.Arduino.valueToCode(block, 'amount', Blockly.Arduino.ORDER_ATOMIC);
  // var direction = Blockly.Arduino.valueToCode(block, 'direction', Blockly.Arduino.ORDER_ATOMIC);
  
  var code = '';
  return code;

}

Blockly.Arduino['drawingrobot_line'] = function(block) {
  var x = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var y = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
  
  var code = '';
  return code;

}

Blockly.Arduino['drawingrobot_circle'] = function(block) {
  var radius = Blockly.Arduino.valueToCode(block, 'radius', Blockly.Arduino.ORDER_ATOMIC);
  
  var code = '';
  return code;

}

Blockly.Arduino['drawingrobot_rectangle'] = function(block) {
  var width = Blockly.Arduino.valueToCode(block, 'width', Blockly.Arduino.ORDER_ATOMIC);
  var height = Blockly.Arduino.valueToCode(block, 'height', Blockly.Arduino.ORDER_ATOMIC);

  var code = '';
  return code;

}

Blockly.Arduino['drawingrobot_lift_stylus'] = function(block) {
  var code = '';
  return code;
}

Blockly.Arduino['drawingrobot_lower_stylus'] = function(block) {
  var code = '';
  return code;
}

Blockly.Arduino['drawingrobot_color'] = function(block) {
  var color = Blockly.Arduino.valueToCode(block, 'color', Blockly.Arduino.ORDER_ATOMIC);

  var code = '';
  return code;

}