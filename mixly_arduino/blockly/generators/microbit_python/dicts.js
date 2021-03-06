/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Python for dictionary blocks.
 * @author acbart@vt.edu (Austin Cory Bart)
 */
'use strict';

goog.provide('Blockly.Python.dicts');

goog.require('Blockly.Python');

Blockly.Python['dict_get'] = function(block) {
  var dict = Blockly.Python.valueToCode(block, 'DICT',
      Blockly.Python.ORDER_MEMBER) || '___';
  var value = Blockly.Python.valueToCode(block, 'ITEM',
      Blockly.Python.ORDER_NONE) || '___';
  var code = dict + '[' + value + ']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.dicts_create_with = function() {
  // Create a list with any number of elements of any type.
  //var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  var default_value = '0';
  


  for (var n = 0; n < this.itemCount_; n++) {

  var keyName = this.getFieldValue('KEY' + n);
    
  code[n] = "'"+keyName+"':"+Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '{' + code.join(', ') + '}\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Python.setups_['setup_lists'+varName] = code;
  return '';
};



Blockly.Python.dicts_keys = function() {
  var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+'.keys()';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dicts_get = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('KEY');
  var code = varName+"['" + text + "']";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dicts_add_or_change = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var KEY = Blockly.Python.variableDB_.getName(this.getFieldValue('KEY'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + "['"  + KEY + "'] = " + argument+'\n';
  return code;
};

Blockly.Python.dicts_delete = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('DICT'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('KEY');
  var code= "del "+ varName+"['" + text + "']\n";
  //Blockly.Python.definitions_['var_declare'+varName] ="del "+ varName+"['" + text + "']\n";
  return code;
};

Blockly.Python.dicts_clear = function() {
 var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+'.clear()\n';
  return code;
};

Blockly.Python.dicts_items = function() {
  var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+'.items()';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dicts_values = function() {
  var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+'.values()';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dicts_length = function() {
  var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='len(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dicts_deldict = function() {
  var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='del ' + varName + '\n';
  return code;
};

Blockly.Python.dicts_add_change_del = function(block){
  var dict = Blockly.Python.valueToCode(block, 'DICT',
      Blockly.Python.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('WHERE');
  var where = block.getFieldValue('OP');
  var KEY = Blockly.Python.variableDB_.getName(this.getFieldValue('KEY'), Blockly.Variables.NAME_TYPE);
  
  

  switch (mode) {
    case 'INSERT':
      //var at2 = block.getFieldValue('AT2');
      var at2 = Blockly.Python.valueToCode(this, 'AT2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
      var code = dict + "['"  + KEY + "'] = " + at2 + '\n'
      break;
    
    case 'DELETE':
      var code = 'del ' + dict + "['"  + KEY + "']\n"
      break;
    default:
      throw 'Unhandled option (lists_setIndex2)';
  }
  return code;
};

