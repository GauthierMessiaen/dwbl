/* global Blockly, goog */

/**
 * @fileoverview Generating Dwenguino blocks.
 * @author tom.neutens@UGent.be     (Tom Neutens)
 */
'use strict';
var machine = "DwenguinoSimulation.";

goog.provide('Blockly.JavaScript.drawingrobot');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['initdwenguino'] = function (block) {
    return "";
};

Blockly.JavaScript['drawingrobot_stepper_motor'] = function(block) {
  var value_channel = Blockly.JavaScript.valueToCode(block, 'channel', Blockly.JavaScript.ORDER_ATOMIC);
  var value_step = Blockly.JavaScript.valueToCode(block, 'step', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = machine + 'stepMotorSteps(' + value_channel + ', ' + value_step + ');\n';
  return code;
}

Blockly.JavaScript['drawingrobot_move'] = function(block) {
  var amount = Blockly.JavaScript.valueToCode(block, 'amount', Blockly.JavaScript.ORDER_ATOMIC);
  var direction = block.getFieldValue('direction');

  var code = machine + 'drawRobotMove(' + direction + ', ' + amount + ');\n';
  return code;
}

Blockly.JavaScript['drawingrobot_line'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = machine + 'drawRobotLine(' + x + ',' + y + ',' + true + ');\n';
  return code;
}

Blockly.JavaScript['drawingrobot_circle'] = function(block) {
  var radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
  var code = machine+"drawRobotCircle(" + radius + ");\n";
  return code;
}

Blockly.JavaScript['drawingrobot_rectangle'] = function(block) {
  var width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = machine + 'drawRobotRectangle(' + width + ',' + height + ');\n';
  return code;
}

Blockly.JavaScript['drawingrobot_lower_stylus'] = function(block) {  
  var code = machine + 'drawRobotLowerStylus();\n';
  return code;
}

Blockly.JavaScript['drawingrobot_lift_stylus'] = function(block) {  
  var code = machine + 'drawRobotLiftStylus();\n';
  return code;
}

Blockly.JavaScript['drawingrobot_color'] = function(block) {
  var color = Blockly.JavaScript.quote_(block.getFieldValue('col'));
  var code = machine + 'changeColor(' + color + ');\n';
  return code;
}