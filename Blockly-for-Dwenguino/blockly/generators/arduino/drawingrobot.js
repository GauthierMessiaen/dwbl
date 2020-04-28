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

    //import stepper motors
    Blockly.Arduino.definitions_['define_dwenguinosteppermotor_h'] = "#include <Stepper.h>\n";
    // declare motor on chosen channel
     // change this to fit the number of steps per revolution for your motor
    var stepsPerRevolution = 200;
    Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_1'] = 'Stepper stepper1(' + stepsPerRevolution + ', 8, 9, 10, 11);\n';
    Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_2'] = 'Stepper stepper2(' + stepsPerRevolution + ', 8, 9, 10, 11);\n';
    Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_1'] = 'int stepCount1 = 0;\n';
    Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_2'] = 'int stepCount2 = 0;\n';
    // initialize the serial port:
    Blockly.Arduino.setups_['initSerialPort1'] = 'Serial.begin(9600);\n';
    Blockly.Arduino.setups_['initSerialPort2'] = 'Serial.begin(9600);\n';

    return code;
};

Blockly.Arduino['drawingrobot_stepper_motor'] = function(block) {
  // //import dwenguino motors
  // Blockly.Arduino.definitions_['define_dwenguinosteppermotor_h'] = "#include <Stepper.h>\n";
  // // declare motor on chosen channel
  // Blockly.Arduino.definitions_['declare_stepper_motor_on_channel_' + value_channel] = 'Stepper motor(numberofstep,9,11,10,6);\n'; // we use pins 9, 11, 10, 6
  // //Set speed of motor
  // Blockly.Arduino.setups_['define_dwenguino_servo' + value_channel] = 'stpMotor' + value_channel + '.setSpeed(' + 9 + ');\n';
  
  // //start motor
  // //var code = 'stpMotor' + value_channel + '.setSpeed(' + value_speed + ');\n';
  // //var code = 'stpMotor' + value_channel + '.step(' + value_step + ');\n';
  // var code = '';
  // return code;

  var value_channel = Blockly.Arduino.valueToCode(block, 'channel', Blockly.Arduino.ORDER_ATOMIC);
  var value_steps = Blockly.Arduino.valueToCode(block, 'steps', Blockly.Arduino.ORDER_ATOMIC);
  
    //start motor
    var code = 'stepper' + value_channel + '.step(' + value_steps + ');\n';
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