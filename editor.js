



Blockly.Blocks['node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("name", null, ), "NAME");
    this.appendStatementInput("CHILDS")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        Nod
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childe; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['token'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("value", null, ), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

if (!Blockly.LARK) {
  Blockly.LARK = new Blockly.Generator('LARK');
  Blockly.LARK.ORDER_ATOMIC = 0;
}

Blockly.LARK.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.LARK.blockToCode(nextBlock);
    return code + nextCode;
}
Blockly.LARK.INDENT='';

Blockly.LARK['node'] = function(block) {
  var code ='';
  
  var field = block.getField('NAME');
  if (!block.data) block.data = {}
  
  // not set or the default has been set before...
  if (!block.data.tokens || JSON.stringify(block.data.tokens) === JSON.stringify(['','','','']))
  {
    if (field.getValue()==='object')
    {
      block.data.tokens = ['{', '}', ',\n', '  '];
    }
    else if (field.getValue()==='array')
    {
      block.data.tokens = ['[', ']', ', \n', '  '];
    }
    else if (field.getValue()==='pair')
    {
      block.data.tokens = ['', '', ' : ', ''];
    }
    else if (field.getValue()==='number' || field.getValue()==='string')
    {
      block.data.tokens = ['','','','']
    }
    else
    {
      block.data.tokens = ['','','','']
      code += 'unknown token name '+field.getValue()
    }
  }

  code += block.data.tokens.before;
  
  code += Blockly.LARK.statementToCode(block, 'CHILDS');
  var surround_parent = block.getSurroundParent();
  
  if (surround_parent && block.getNextBlock()) // and not the last block
  {
    code += surround_parent.data.tokens.seperator;
  }
  code += block.data.tokens.after;
  
  // it is ok to have only before and after tokens 
  // but an empty pair is not possible
  if (block.data.tokens.before==='' && !block.getInputTargetBlock("CHILDS"))
  {
    code += "no child connected"
  }
  return code;
};


Blockly.LARK['token'] = function(block) {
  var code ='';
  var field = block.getField('VALUE');
  code += field.getValue();
  return code;
}
;
function totalBlockToCode(block, seperator)
{
  var code = ''
  if (block)
  {
    if( block.data.value)
    {
      code += block.data.value
    }
    else
    {
      should_not_happen
    }
    if (block.getNextBlock())
    {
      code += seperator
      code += totalBlockToCode(block.getNextBlock(), seperator)
    }
  }
  return code
}

function blockToCode(block, input_file, block_input)
{

  // TODO should be block_input.nmae however to support more inputs...
  // however this should be fixed in the variable replace
  const child_tokens = block.data.tokens.CHILDS; //[block_input.name]
  const before = child_tokens.before
  const after = child_tokens.after
  const seperator = child_tokens.seperator
  const seperator_on_last = ''; // child_token.seperator_on_last

  // render the tokens
  var code = '';
  if (!block) return code

  code += before
  
  // render the statements
  // take the whole value of the target blocks and walk every next
  code += totalBlockToCode(block.getInputTargetBlock(block_input.name), seperator, input_file)
  
  // make sure the last seperator is added
  code += seperator_on_last;  
  // end token of this input
  code += after // block.data.input_tokens[input][1]
  
  // no need to render the next as we only replace this one block 
  // with the inner childs
  
  return code

}

function render(block, input, block_input)
{
  // only this block_input needs to be changed not the whole block
  var diff = []

  const child_loc = block.data.inputs_loc[block_input.name]  

  diff.push([0, input.slice(0, child_loc[START_POS])])
  var remove = input.slice(child_loc[START_POS], child_loc[END_POS])
  diff.push([-1, remove])
  // TODO keep as much as possible in the blockToCode
  diff.push([1, blockToCode(block, input, block_input) ])
  
  diff.push([0, input.slice(child_loc[END_POS]-1,-1)])
  
  
  
  var dmp = new diff_match_patch();
  var patches = dmp.patch_make(diff)
  var code = dmp.patch_apply(patches, input)
  document.getElementById('inputDiv').value = code[0];
          input = code[0];
          input_changed = true
}

function process_text_changes(old_json, new_json, old_short_to_long, new_short_to_long, old_complete_workspace)
{

  var input = document.getElementById('inputDiv').value;
      
  // now we have the smallest diff
  // 
  var input_changed=false;


  var old_workspace = JSON.parse(old_json)
  var new_workspace = JSON.parse(new_json)
 
  var old_ids = get_ids(old_workspace.blocks);
  var new_ids = get_ids(new_workspace.blocks);
  
  var ids_added = difference(new_ids, old_ids)
  var ids_removed = difference(old_ids, new_ids)
  var ids_common = intersection(new_ids, old_ids)

  var old_connections = get_connections(old_workspace.blocks);
  var new_connections = get_connections(new_workspace.blocks);
  
  var connections_added = difference(new_connections, old_connections)
  var connections_removed = difference(old_connections, new_connections)

  // start with replacing as it is possible to change removed

  for (const id of ids_common) {
    var mine_block = get_block(new_workspace.blocks, id);
    var previous_block = get_block(old_workspace.blocks, id);
    
    var mine_state = mine_block.fields;
    var previous_state = previous_block.fields;
  
    if (mine_state)
    {
      for (const [key, value] of Object.entries(mine_state)) {
        if (previous_state[key]===value)
        {
          
        }
        else
        {
          var diff = []
          block = old_complete_workspace.getBlockById(old_short_to_long[id])
          diff.push([0, input.slice(0, block.data.fields_loc[key][START_POS])])
          diff.push([-1, previous_state[key]])
          diff.push([1, value])
          diff.push([0, input.slice(block.data.fields_loc[key][END_POS],-1)])
          var dmp = new diff_match_patch();
          var patches = dmp.patch_make(diff)
          var code = dmp.patch_apply(patches, input)
          document.getElementById('inputDiv').value = code[0];
          input = code[0];
          input_changed = true
        }
      }
    }
  }

  // only add the data.value yet as we do not know where to place the block
  for (const id of ids_added)
  {
    var block = workspace.getBlockById(new_short_to_long[id])
    // even is the block is added (sounds new) it could be undo so all info still there
    if (!block.data) 
    {  
      block.data = {}
      block.data.value = Blockly.JSON.blockToCode(block, true);
    }
  }



  // only left: remove and connect


  // goto the surround parent and render the changed input
  for (const id of ids_removed)
  {
    var removed_block = old_complete_workspace.getBlockById(old_short_to_long[id])
    // get the surround_parent of the new workspace
    var surround_parent = workspace.getBlockById(removed_block.getSurroundParent().id)
    // make sure we use the removed_block surround parent as in the new workspace it is gone
    const block_input = removed_block.getSurroundParent().getInputWithBlock(removed_block.getTopStackBlock())
    render(surround_parent, input, block_input)
    input_changed = true
  }

  for (const connection of connections_added)
  {
    var sp  = connection.split(' ');
    var from_id = sp[0];
    var input_name = sp[1];
    var target_id = sp[2];
    var block = workspace.getBlockById(new_short_to_long[target_id])
    if (block) // the block can be removed
    {
      // insert the text block here after the loc of the id_common
      var parent = workspace.getBlockById(new_short_to_long[from_id])
      var surround_parent = block.getSurroundParent()
      if(ids_common.has(from_id) && ids_added.has(target_id))
      {
        // only the input of the surround parent needs a render
        // "LIST" in case of dict_list_block
        var block_input = surround_parent.getInputWithBlock(block.getTopStackBlock())

        render(surround_parent, input, block_input)
        input_changed = true
      }
    }
  }
  // need to update the locs here as next changes can need them
  if (input_changed)  // update the locs
  {
    text_changed()
    input_changed = false
  }

  return



  

 

  

  for (const connection of connections_added)
  {
    var sp  = connection.split(' ');
    var from_id = sp[0];
    var input_name = sp[1];
    var target_id = sp[2];
    // if connection from id_common to id_new
    if(ids_common.has(from_id) && ids_added.has(target_id))
    {
      var block = workspace.getBlockById(new_short_to_long[target_id])
      // insert the text block here after the loc of the id_common
      var parent = workspace.getBlockById(new_short_to_long[from_id])
      var surround_parent = block.getSurroundParent()

      
      var diff = []
      var insert = ''
      
      if (surround_parent===parent) // first block
      {
        // keep till { TODO should be keep till the CHILD location,  
        diff.push([0, input.slice(0, parent.data.loc[START_POS] + 
          parent.data.value.indexOf(parent.data.tokens[0])+ parent.data.tokens[0].length)])
    
      }
      else
      {
        // keep untill the existing parent
        diff.push([0, input.slice(0, parent.data.loc[END_POS])])
        insert += surround_parent.data.tokens[2]
      
      }
      
      insert += block.data.value;

      diff.push([1, insert])
      if (surround_parent===parent)
      {
        // keep from the }
        diff.push([0, input.slice(parent.data.loc[END_POS]-parent.data.value.indexOf(parent.data.tokens[1]),-1)])
        
      }
      else
      {
        diff.push([0, input.slice(parent.data.loc[END_POS],-1)])
      }
      var dmp = new diff_match_patch();
      var patches = dmp.patch_make(diff)
      var code = dmp.patch_apply(patches, input)
      document.getElementById('inputDiv').value = code[0];
      input = code[0];
      input_changed = true


    }
  }

  
  
}

// replace at the place where the old VALUE was the new VALUE
function blocks_changed(event) {

  if (event.isUiEvent) return
  // the blocks workspace is changed
  var pretty_code = Blockly.JSON.workspaceToCode(workspace)
  document.getElementById('codeDiv').value = pretty_code;
  

  

  // make sure the pretty code compiles
  // for example a duplicate is not connected yet
  try
  {
      parse_example(pretty_code)
  }
  catch(e)
  {
    // new event but not undo as undo will lead to a good 
    // parsable tree
    if (event.type=="create")
    {
      var block = workspace.getBlockById(event.blockId)
      var value = block.data.value;
      // remove the loc, tokens, but the value is still ok
      block.data={}
      block.data.value = value
    }
    else if (event.type=="change")
    {
      var block = workspace.getBlockById(event.blockId)
      block.data.value = Blockly.JSON.blockToCode(block, true);
    }
    return;
  }
  
  // as we ignore some event till now as they resulted in 
  // not parsing json code we need to compare it with the 
  // text input and generated events
  // get the existing workspace diffable text

  var output = get_diffable_text(workspace)
  var new_json = output.text
  var new_short_to_long = output.short_to_long

  var input = document.getElementById('inputDiv').value
  var workspace_json = parse_example(input)
  // convert the workspace from LARK to basic (in place)
  lark_to_basic(workspace_json)
   
  // use another headless workspace and put the workspace_json in this one
  var old_workspace = new Blockly.Workspace()
  // the parser will only return on top_blocks so [0] is sufficient
  Blockly.serialization.blocks.append(workspace_json.blocks.blocks[0], old_workspace)
  
  // also get the new workspace diffable text
  output = get_diffable_text(old_workspace)
  var old_json = output.text;
  var old_short_to_long = output.short_to_long;
  
  // first update the old_json to match the new json by updating the ids (line_nrs)
  var update = update_old_json_to_match_new_json(old_json, new_json, old_short_to_long)
  old_json = update.old_json;
  new_json = update.new_json;
  old_short_to_long = update.old_short_to_long;
  
  
  // send events for all changes to the text
  process_text_changes(old_json, new_json, old_short_to_long, new_short_to_long, old_workspace)
  return


  
  if (event.type=="change" )
  {
    console.log(event)
    if (ignore_events>0)
    { 
      ignore_events--;
      return
    }
    var text = document.getElementById('inputDiv').value
    var block = workspace.getBlockById(event.blockId)
    if (block.type=="token")
    {
      var diff = [];
      diff.push([0, text.slice(0, block.data.loc[0])])
      diff.push([-1, event.oldValue])
      diff.push([ 1, event.newValue])
      diff.push([0, text.slice(block.data.loc[1], text.length)])
      var dmp = new diff_match_patch();
      var patches = dmp.patch_make(diff)
      var pretty_code = dmp.patch_apply(patches, text)

      document.getElementById('codeDiv').value = pretty_code[0];
      document.getElementById('inputDiv').value = pretty_code[0];
      
      // TODO:easy way to update the loc however what if the text does not parse at this moment
      // also the data needs to be changed
      // or the events are not send yet when the parsing failed... just like on the text parsing

      text_changed()

    }
  }
  
  if (event.type=="create")
  {
    console.log(event)
    if (ignore_events>0)
    { 
      ignore_events--;
      return
    }


    // no update in the text yet as we do not know where to insert 
    var block = workspace.getBlockById(event.blockId)
    // make a deep copy of the data otherwise is stays shared with the previous block 
    block.data = JSON.parse(JSON.stringify(block.data));
    //   
    if (!block.data.value)
    {
        // set the data by calling code generation
        block.data.value = Blockly.LARK.blockToCode(block);
    }
    //document.getElementById('inputDiv').value = code[0];
//    var text = document.getElementById('inputDiv').value
    // keep the whole text and place the text at the end
    
    
    // // update the locs (TODO: for now only the first two locs are used)
    // for (var i=0; i<event.ids.length;i++)
    // {
    //   var block = workspace.getBlockById(event.ids[i])
    //   // make a deep copy of the data otherwise is stays shared with the previous block
    //   block.data = JSON.parse(JSON.stringify(block.data));
    //   // placed at the end, but remove the starting pos 
    //   var offset=text.length-event.json.data.loc[0]
    //   block.data.loc = [block.data.loc[0]+offset, block.data.loc[1]+offset]
    // }
    
    
    //document.getElementById('codeDiv').value = block.data.value;
  //  document.getElementById('inputDiv').value = code[0];
    
    //inputChanged()   
  }  

  if (event.type=="move") // attach to parent
  {
    console.log(event)
    if (ignore_events>0)
    {
      ignore_events--;
      return
    }
    if (event.newParentId)
    {

      // place this tokens after the parent (previous child) 
      // surround_parent != parent
      var diff = []
      var block = workspace.getBlockById(event.blockId)
      var surround_parent = block.getSurroundParent() 
      var parent = block.getParent()  // block connected on top
      var text = document.getElementById('inputDiv').value

      parent.data.loc[END_POS]
      diff.push([0, text.slice(0, parent.data.loc[END_POS])])
      // put the seperator known by the surrounding parent
      diff.push([1, surround_parent.data.tokens[2]])
      diff.push([1, block.data.value])
      // keep the closing part of the surround parent
      diff.push([0, surround_parent.data.tokens[1]])
      // remove the block where it came from 
      diff.push([-1, block.data.value])
      
      
      
      var dmp = new diff_match_patch();
      var patches = dmp.patch_make(diff)
      var pretty_code = dmp.patch_apply(patches, text)
      document.getElementById('codeDiv').value = pretty_code[0];
      document.getElementById('inputDiv').value = pretty_code[0];
      //inputChanged()   


      // place this tokens after the parent same as surround parent
      // if no child was there
      // surround_parent == parent
      // prefix with first_prefix or with next_prefix

    }
  } 
  
  if (event.type=="delete") 
  {
    console.log(event)
    if (ignore_events>0)
    { 
      ignore_events--;
      return
    }
    // todo should also update the parent, but how to get a reference
    // or is a move event raised as well?
    var text = document.getElementById('inputDiv').value
    var block = event.oldJson
    var diff = [];
      diff.push([0, text.slice(0, block.data.loc[0])])
      diff.push([-1, text.slice(block.data.loc[0], block.data.loc[1])])
      diff.push([0, text.slice(block.data.loc[1], text.length)])
      var dmp = new diff_match_patch();
      var patches = dmp.patch_make(diff)
      var pretty_code = dmp.patch_apply(patches, text)

      document.getElementById('codeDiv').value = pretty_code[0];
      document.getElementById('inputDiv').value = pretty_code[0];
  }
}



/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Loading and saving blocks with localStorage and cloud storage.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

// Create a namespace.
var BlocklyStorage = {};



BlocklyStorage.HTTPREQUEST_ERROR = 'There was a problem with the request.\n';
BlocklyStorage.LINK_ALERT = 'Share your blocks with this link:\n\n%1';
BlocklyStorage.HASH_ERROR = 'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
    'Perhaps it was created with a different version of Blockly?';

/**
 * Backup code blocks to localStorage.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.backupBlocks_ = function(workspace, id) {
  if ('localStorage' in window) {
    var json_text = Blockly.serialization.workspaces.save(workspace);
    // Gets the current URL, not including the hash.
    var url = window.location.href.split('#')[0]+id+'.json';
    window.localStorage.setItem(url, JSON.stringify(json_text));
  }
};

/**
 * Bind the localStorage backup function to the unload event.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.backupOnUnload = function(opt_workspace,id) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  window.addEventListener('unload',
      function() {BlocklyStorage.backupBlocks_(workspace,id);}, false);
};

/**
 * Restore code blocks from localStorage.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.restoreBlocks = function(opt_workspace, id) {
  var url = window.location.href.split('#')[0];
  if ('localStorage' in window && window.localStorage[url+id+'.json']) {
    var workspace = opt_workspace || Blockly.getMainWorkspace();
    var json = JSON.parse(window.localStorage[url+id+'.json']);
    Blockly.serialization.workspaces.load(json, workspace);
   }
};

/**
 * Save blocks to database and return a link containing key to XML.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.link = function(opt_workspace, editor) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  var xml = Blockly.Xml.workspaceToDom(workspace, true);
  // Remove x/y coordinates from XML if there's only one block stack.
  // There's no reason to store this, removing it helps with anonymity.
  if (workspace.getTopBlocks(false).length == 1 && xml.querySelector) {
    var block = xml.querySelector('block');
    if (block) {
      block.removeAttribute('x');
      block.removeAttribute('y');
    }
  }
  var data = Blockly.Xml.domToText(xml);
  BlocklyStorage.makeRequest_('/storage', 'xml', data, workspace, editor);
};

/**
 * Retrieve XML text from database using given key.
 * @param {string} key Key to XML, obtained from href.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.retrieveXml = function(key, opt_workspace, editor) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  BlocklyStorage.makeRequest_('/storage', 'key', key, workspace, editor);
};

/**
 * Global reference to current AJAX request.
 * @type {XMLHttpRequest}
 * @private
 */
BlocklyStorage.httpRequest_ = null;

/**
 * Fire a new AJAX request.
 * @param {string} url URL to fetch.
 * @param {string} name Name of parameter.
 * @param {string} content Content of parameter.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.makeRequest_ = function(url, name, content, workspace, editor) {
  if (BlocklyStorage.httpRequest_) {
    // AJAX call is in-flight.
    BlocklyStorage.httpRequest_.abort();
  }
  BlocklyStorage.httpRequest_ = new XMLHttpRequest();
  BlocklyStorage.httpRequest_.name = name;
  BlocklyStorage.httpRequest_.onreadystatechange =
      BlocklyStorage.handleRequest_;
  BlocklyStorage.httpRequest_.open('POST', url);
  BlocklyStorage.httpRequest_.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
  BlocklyStorage.httpRequest_.send(name + '=' + encodeURIComponent(content)+ '&workspace=' + encodeURIComponent(workspace.name));
  BlocklyStorage.httpRequest_.workspace = workspace;
};

/**
 * Callback function for AJAX call.
 * @private
 */
BlocklyStorage.handleRequest_ = function() {
  if (BlocklyStorage.httpRequest_.readyState == 4) {
    if (BlocklyStorage.httpRequest_.status != 200) {
      BlocklyStorage.alert(BlocklyStorage.HTTPREQUEST_ERROR + '\n' +
          'httpRequest_.status: ' + BlocklyStorage.httpRequest_.status);
    } else {
      var data = BlocklyStorage.httpRequest_.responseText.trim();
      if (BlocklyStorage.httpRequest_.name == 'xml') {
        window.location.hash = data;
        BlocklyStorage.alert(BlocklyStorage.LINK_ALERT.replace('%1',
            window.location.href));
      } else if (BlocklyStorage.httpRequest_.name == 'key') {
        if (!data.length) {
          BlocklyStorage.alert(BlocklyStorage.HASH_ERROR.replace('%1',
              window.location.hash));
        } else {
          BlocklyStorage.loadXml_(data, BlocklyStorage.httpRequest_.workspace);
        }
      }
      BlocklyStorage.monitorChanges_(BlocklyStorage.httpRequest_.workspace);
    }
    BlocklyStorage.httpRequest_ = null;
  }
};

/**
 * Start monitoring the workspace.  If a change is made that changes the XML,
 * clear the key from the URL.  Stop monitoring the workspace once such a
 * change is detected.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.monitorChanges_ = function(workspace) {
  var startXmlDom = Blockly.Xml.workspaceToDom(workspace);
  var startXmlText = Blockly.Xml.domToText(startXmlDom);
  function change() {
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToText(xmlDom);
    if (startXmlText != xmlText) {
      window.location.hash = '';
      workspace.removeChangeListener(change);
    }
  }
  workspace.addChangeListener(change);
};

/**
 * Load blocks from XML.
 * @param {string} xml Text representation of XML.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.loadXml_ = function(xml, workspace) {
  try {
    xml = Blockly.Xml.textToDom(xml);
  } catch (e) {
    BlocklyStorage.alert(BlocklyStorage.XML_ERROR + '\nXML: ' + xml);
    return;
  }
  // Clear the workspace to avoid merge.
  workspace.clear();
  Blockly.Xml.domToWorkspace(xml, workspace);
};

/**
 * Present a text message to the user.
 * Designed to be overridden if an app has custom dialogs, or a butter bar.
 * @param {string} message Text to alert.
 */
BlocklyStorage.alert = function(message) {
  window.alert(message);
};

toolbox = {
 "kind": "flyoutToolbox",
 "contents": [
  {
    "kind": "block",
    "type": "node"
  },
  {
    "kind": "block",
    "type": "token"
  },
 ]
};
    




// hardcoded till the end

var options = { 
  toolbox : toolbox, 
  collapse : true, 
  comments : true, 
  disable : false, 
  maxBlocks : Infinity, 
  trashcan : false, 
  horizontalLayout : false, 
  toolboxPosition : 'start', 
  css : true, 
  zoom: {
    controls: true,
  },
  media : 'https://blockly-demo.appspot.com/static/media/', 
  rtl : false, 
  scrollbars : true, 
  sounds : true, 
  oneBasedIndex : true
};

function codeGeneration(event) {
  if (Blockly.LARK)
  {  
    try {
          var code = Blockly.LARK.workspaceToCode(workspace);
    } catch (e) {
      console.warn("Error while creating code", e);
      code = "Error while creating code:" + e
    }     
    document.getElementById('codeDiv').value = code;
  }
}

function updateDropdownRename(event)
{
  if (event.type == "change" && (event.name=="NAME" || event.name=="FIELDNAME" ) || event.type == "create")
  {
    var blocks = workspace.getAllBlocks(); 
    for (var k = 0; k < blocks.length; k++) {
      var block = blocks[k];
 
      for (var i = 0, input; (input = block.inputList[i]); i++) {
        for (var j = 0, field; (field = input.fieldRow[j]); j++) {
          if (field.getOptions) // is dropdown
          {
           // during name update of a block  
           // stay to have the same value (block id)
           // but need to rerender the text
           // get and setValue are needed (probably some side effect)
           var value = field.getValue();
           var field_options = field.getOptions();
           field.setValue(value)     
           field.forceRerender()
          }
        }
      }
   }
  }
}

var workspace;

function vscode_start()
{
  inject();

  search();

}

function search()
{
  workspace.workspaceSearch = new WorkspaceSearch(workspace);

  workspace.workspaceSearch.init();
  workspace.workspaceSearch.open();
}

function inject()
{
  /* Inject your workspace */ 
  workspace = Blockly.inject("blocklyDiv", options);
  workspace.name="Concrete"
}

var click_loc = 0
function mySelection(event) {
  if (event.type == "click" && event.blockId )
  {
    var block = workspace.getBlockById(event.blockId)
    var input = document.getElementById('inputDiv')
    console.log(event.blockId)
    input.setSelectionRange(block.data.loc[0], block.data.loc[1]);
    document.getElementById('codeDiv').value = block.data.tokens.before
    if (click_loc % 3 ==1 && block.data?.fields_loc?.KEY) {
        input.setSelectionRange(block.data.fields_loc.KEY[0], block.data.fields_loc.KEY[1]);
       // document.getElementById('codeDiv').value = block.data.tokens.KEY.before
    }

    if (click_loc % 3 ==2 && block.data?.inputs_loc?.LIST) {
        input.setSelectionRange(block.data.inputs_loc.LIST[0], block.data.inputs_loc.LIST[1]);
        document.getElementById('codeDiv').value = block.data.tokens.LIST.before
        
    }
    click_loc +=1

    input.focus();
  }
  if (event.type == 'click' && !event.blockId)
  {

  }
}

function get_example()
{
  //return get_struct_example()
  return get_json_example()

  //return get_python_example()
}

function get_json_example()
{
    //const text='{"b":{"C":{"d":[1,2,3]}}}'
    const text = '{"B":[1,2,3]}'
//`
//{"a":3,"b":3,"c":[3, 2, "b"]}
//`

return text;
}

function get_struct_example()
{
  const text=
`
typedef struct
{
    # @TODO: remove example code
    int sample_input < desc = "Sample Input", microhelp = "Enter sample input", default = 10, min = 0, max = 100>;

} SOME_DEF:input_struct;

`
  return text;
}
function get_python_example()
{
    const text=
`
import sys
a =7
print('hi', 3)


`
    return text;
}


function keepTrackOfChanges(event)
{
  if (event.newValue)
  {
    var block = workspace.getBlockById(event.blockId)
    block.data.changed = true;
  }
}

function start()
{
  inject();

  //BlocklyStorage.restoreBlocks(workspace, 'concrete');
  //BlocklyStorage.backupOnUnload(workspace, 'concrete');

  //workspace.addChangeListener(codeGeneration);
  workspace.addChangeListener(updateDropdownRename);
  workspace.addChangeListener(mySelection);
  workspace.addChangeListener(keepTrackOfChanges);
  workspace.addChangeListener(blocks_changed);

  

  //search();
  document.getElementById("save").addEventListener("click", saveFile);
  document.getElementById("inputDiv").addEventListener("input", text_changed);
  
  add_load();
  var text = get_example()
  document.getElementById('inputDiv').value = text;

  var workspace_json = parse_example(text)

  // convert the block_lark_json to block_basic_json
  lark_to_basic(workspace_json)

  // ignore the creation of these blocks
  // only one create event will be send for the whole structure
  ignore_events = 1; // nr_blocks;
  // the parser will only return one top_block so [0] is sufficient
  Blockly.serialization.blocks.append(workspace_json.blocks.blocks[0], workspace)
		  
}
var ignore_events

function lark_to_basic(workspace_json)
// inout
{
  // using the match.js and match.json
  var match_workspace = new Blockly.Workspace()
  Blockly.serialization.workspaces.load(matcher_recept, match_workspace)


  // walk the match_replace blocks to replace the blocks in block_json
  var top_blocks = match_workspace.getTopBlocks();
  var code = '';
  for(var j=0;j<top_blocks.length;j++)  
  {
    var top_block = top_blocks[j];
    while (top_block)
    {
      if (top_block.type == "match_replace")
      {
        code += match_replace_top(top_block.getInputTargetBlock("MATCH"), 
                                        top_block.getInputTargetBlock("REPLACE"), 
                                        workspace_json)
      }
      top_block = top_block.getNextBlock();
    }
  }

}

function text_changed(event)
{
  // get the existing workspace diffable text
  var output = get_diffable_text(workspace)
  var old_json = output.text
  var old_short_to_long = output.short_to_long

  // get the new text to be parsed to a workspace
  var text = document.getElementById('inputDiv').value;
  var workspace_json = parse_example(text)
  
  // convert the block_lark_json to block_basic_json
  lark_to_basic(workspace_json)

  // use another headless workspace and put the workspace_json in this one
  var new_workspace = new Blockly.Workspace()
  Blockly.serialization.blocks.append(workspace_json.blocks.blocks[0], new_workspace)
  
  // also get the new workspace diffable text
  output = get_diffable_text(new_workspace)
  var new_json = output.text;
  var new_short_to_long = output.short_to_long;
  
  // first update the old_json to match the new json by updating the ids (line_nrs)
  var update = update_old_json_to_match_new_json(old_json, new_json, old_short_to_long)
  old_json = update.old_json;
  old_short_to_long = update.old_short_to_long;

  // send events for all changes to the workspace
  process_blocks_changes(old_json, new_json, old_short_to_long, new_short_to_long, new_workspace)

}

function get_json(workspace)
{
  var json_text = Blockly.serialization.workspaces.save(workspace);
  var data = JSON.stringify(json_text, undefined, 2);
  return data
}

function download(name, url) {
  const a = document.createElement('a')
  a.href = url
  
  a.download = name;
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function update_old_json_to_match_new_json(old_json, new_json, old_short_to_long)
{
    // both old and new are allready preprocessed
    // but the line numbers (ids) jump on every diff
    // so process every diff and update the ids 
  
    var dmp = new diff_match_patch();
    
    var from_id = 0;
    var from_diff = 0;
    var process=true
    
    // continue till no more diffs 
    while (process)
    {
      var diff = dmp.diff_main(old_json, new_json)
      dmp.diff_cleanupSemantic(diff)
      process = false
  
      // skip previous handled diffs but continue to process 
      // on every adding/removing of lines so on every ids update
      for (var i=from_diff;i<diff.length && !process;i++)
      {
        // skip this diff for the next run
        from_diff = i+1;
        // count the number of lines in this diff
        var nr_lines = diff[i][1].split("\n").length-1
        // maybe nr_lines will be negative at some time 
        // if we multiply with the diff[i][0] 
        // which is 1 for add, -1 for remove, 0 no change
        if (nr_lines!=0) 
        {
          if (diff[i][0] == 0)
          {
            // no difference till here, so skip these ids in the replace
            from_id += nr_lines;
          }
  
          else if (diff[i][0] == -1)
          {
            // lines removed
            var values = Object.keys(old_short_to_long)
            for (var j=0;j<values.length;j++)
            {
              var {line_nr, block_type} = unpack_unique_id(values[j])
              
              // only do something for the line_nr is after the allready skipped part
              // updated when no changes are detected
              if (line_nr>from_id)
              {
                // the 'new' id can collide with an existing id as we substract nr_lines,
                // make it unique again by adding one till it is unique
                // TODO check: what is we collide a lot, probably now as ids are only present 
                // about 1 out of 8 lines
                var new_id;
                
                for (var k=0;k<1000;k++)
                {
                  new_id = create_unique_id(line_nr-nr_lines+k, block_type) 
                  if (values.indexOf(new_id)==-1) 
                  {
                    // also fix the other side if we collide in this file
                    if (k>0) // no need for this if but is saves a noop replace
                    {
                      new_json = new_json.replaceAll(create_unique_id(line_nr-nr_lines, block_type), new_id)
                    }
                    break;
                  }
                }
                
                // store the new id
                old_short_to_long[new_id] = old_short_to_long[values[j]]
                delete old_short_to_long[values[j]]
  
                // change the old_json with the new id that is shifted
                old_json = old_json.replaceAll(values[j], new_id)
              }
            }
            process = true
          }
          else if (diff[i][0] == 1)
          {
            // lines added
  
            // todo all code is the same except the + or - for nr_lines
            var values = Object.keys(old_short_to_long)
            for (var j=0;j<values.length;j++)
            {
              var {line_nr, block_type} = unpack_unique_id(values[j]) 
              
              if (line_nr>from_id)
              {
                var new_id;
                
                for (var k=0;k<1000;k++)
                {
                  new_id = create_unique_id(line_nr+nr_lines+k, block_type) 
                  if (values.indexOf(new_id)==-1) 
                  {
                    // also fix the other side if we collide in this file
                    if (k>0) // no need for this if but is saves a noop replace
                    {
                      new_json = new_json.replaceAll(create_unique_id(line_nr+nr_lines, block_type), new_id)
                    }
                    break;
                  }
                }
                old_short_to_long[new_id] = old_short_to_long[values[j]]
                delete old_short_to_long[values[j]]
                old_json = old_json.replaceAll(values[j], new_id)
              }
            }
            process = true
          }
        }
      }
    }
    return {old_json, new_json, old_short_to_long}
}

function process_blocks_changes(old_json, new_json, old_short_to_long, new_short_to_long, new_complete_workspace)
{

  // now we have the smallest diff
  
  var old_workspace = JSON.parse(old_json)
  var new_workspace = JSON.parse(new_json)
 
  var mine_ids = get_ids(new_workspace.blocks);
  var previous_ids = get_ids(old_workspace.blocks);

  var ids_added_mine = difference(mine_ids, previous_ids)
  var ids_removed_mine = difference(previous_ids, mine_ids)
  var ids_common = intersection(mine_ids, previous_ids)

  for (const id of ids_added_mine)
  {
    // create block 
    var block = get_block(new_workspace.blocks,id)
    var json = {}
    var block_id = new_short_to_long[block.id]
    var new_block = new_complete_workspace.getBlockById(new_short_to_long[block.id])
    json.blockId = block_id
    json.type = 'create'
    json.ids = [block_id]
    json.json = {type: block.type, id: block_id, data:{loc:new_block.data.loc, 
                                                       value:new_block.data.value,
                                                       inputs_loc:new_block.data.inputs_loc,
                                                       fields_loc:new_block.data.fields_loc}}
    console.log(json)
    json.xml = "<block type=\"" + block.type +"\" id=\"" + block_id +"\"></block>"
    var event = Blockly.Events.fromJson(json, workspace);
    //ignore_events += 2; // create and move event
    ignore_events += 1;
    event.run(true)

  }

  for (const id of ids_removed_mine)
  {
    // despose block
    var block = get_block(old_workspace.blocks,id)
    var json = {}
    var block_id = old_short_to_long[block.id]
    json.blockId = block_id
    json.type = "delete"
    json.ids = [block_id]
    json.oldJson = {type: block.type, id: block_id}
    json.oldXml = "<block type=\"" + block.type +"\" id=\"" + block_id +"\"></block>"
    var event = Blockly.Events.fromJson(json, workspace);
    ignore_events += 1 // delete
    event.run(true)
  }

  var mine_connections = get_connections(new_workspace.blocks);
  var previous_connections = get_connections(old_workspace.blocks);

  var connections_added_mine = difference(mine_connections, previous_connections)
  var connections_remove_mine = difference(previous_connections, mine_connections)

  // nothing to do with common
  //var connections_common = intersection(previous_connections, mine_connections)

  for (const id of connections_added_mine)
  {
    var sp  = id.split(' ');
    var from_id = sp[0];
    var input_name = sp[1];
    var target_id = sp[2];
    // create connection
    var block = get_block(new_workspace.blocks,target_id)

    var json = {}
    json.blockId = new_short_to_long[block.id]
    if (input_name!="next")
    {
      json.newInputName = input_name
    }
    
    if(workspace.getBlockById(new_short_to_long[from_id]))
    {
      // get from the new_short_to_long if the connection is between new and new
      json.newParentId = new_short_to_long[from_id]
    }
    else
    {
      // get from the old_short_to_long if the connection is between new and old
      json.newParentId = old_short_to_long[from_id]
    } 
    json.type = "move"
    var event = Blockly.Events.fromJson(json, workspace);
    ignore_events += 1
    event.run(true)
  }

  for (const id of connections_remove_mine)
  {
    // remove connection
    var sp  = id.split(' ');
    var from_id = sp[0];
    var input_name = sp[1];
    var target_id = sp[2];
    // create connection
    var block = get_block(old_workspace.blocks,target_id)
    var json = {}
    json.blockId = old_short_to_long[block.id]
    json.newParentId = undefined
    json.newInputName = undefined
    json.type = "move"
    var event = Blockly.Events.fromJson(json, workspace);
    ignore_events += 1
    event.run(true)
  }
  

  // all new block need to set all properties
  for (const id of ids_added_mine)
  {
    var mine_block = get_block(new_workspace.blocks, id);
    var mine_state = mine_block.fields;
    if (mine_state)
    {
      for (const [key, value] of Object.entries(mine_state)) {
        var json = {}
        
        json.blockId = new_short_to_long[mine_block.id]
        json.element = "field"
        json.name = key
        json.newValue = value
        json.type = "change"
        var event = Blockly.Events.fromJson(json, workspace)
        ignore_events += 1
        event.run(true)
      }
    }
  }

  // for all the common ids send events on changed values
  for (const id of ids_common) {
    var mine_block = get_block(new_workspace.blocks, id);
    var previous_block = get_block(old_workspace.blocks, id);
    
    var mine_state = mine_block.fields;
    var previous_state = previous_block.fields;
  
    if (mine_state)
    {
      for (const [key, value] of Object.entries(mine_state)) {
        if (previous_state[key]===value)
        {
          
        }
        else
        {
          var json = {}
          
          json.blockId = old_short_to_long[mine_block.id]
          json.element = "field"
          json.name = key
          json.newValue = value
          json.oldValue = previous_state[key]
          json.type = "change"
          var event = Blockly.Events.fromJson(json, workspace)
          ignore_events += 1
          event.run(true)
        }
      }
    }
    // the loc value and tokens could also need an update as some white space could be added
    var block = workspace.getBlockById(old_short_to_long[mine_block.id])
    var new_block = new_complete_workspace.getBlockById(new_short_to_long[previous_block.id])
    if (block.data)
    {
      block.data.loc = new_block.data.loc
      block.data.fields_loc = new_block.data.fields_loc 
      block.data.inputs_loc = new_block.data.inputs_loc
      block.data.value = new_block.data.value
      block.data.tokens = new_block.data.tokens
    }
  }
  // now events are send for every changes (and not more) so the workspace if updated
}

function get_block(blocks, id)
{
  for (var i=0;i<blocks.length;i++)
  {
    if(blocks[i].id === id) return blocks[i]
  }
  // should always be found otherwise problem
  not_found
}

function get_connections(blocks)
{
  var connections_set = new Set();

  for (var i=0; i<blocks.length; i++)
  {
	  var block = blocks[i];
    if (block.inputs) 
    {
      var childern=Object.getOwnPropertyNames(block.inputs)
      for (var j=0; j<childern.length;j++)
      {
        var name = childern[j];
        var target_id = block.inputs[name].block.id
        connections_set.add(block.id+' '+name+' '+target_id)
      }
    }  
    if (block.next)
    {
      connections_set.add(block.id+' next '+block.next.block.id)
    }
  }
  return connections_set;
}


function intersection(setA, setB) {
  const _intersection = new Set();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function get_ids(blocks)
{
	var ids = new Set();
  for(var i=0; i<blocks.length;i++)
  {
    var block=blocks[i];
    ids.add(block.id);
  }
  return ids
}

// post fix the line nr to make it a unique id otherwise values will be replaced as well
const UNIQUE_ID = "sfj;kj32!@#%!@"
const UNIQUE_SEP = "|&&|"

function create_unique_id(line_nr, block_type)
{
  // prefix and post fix the id with some unique string to be able to search
  // and replace the whole text
  // note '|&&|' should not be in the block_type (and line_nr)
  return [UNIQUE_ID,line_nr,block_type,UNIQUE_ID].join(UNIQUE_SEP)
   
}

function unpack_unique_id(unique_id)
{
  var splitted = unique_id.split(UNIQUE_SEP)
  return {line_nr: Number(splitted[1]), block_type : splitted[2]}
}

function get_diffable_text(workspace)
{
  // get the mergeable format (sorted from top to bottom)
  // remove properties that do not care
  // ids will be different every time a file is created
  // replace all ids by the line number in the json file

  var save_blocks = save_mergeable(workspace)
  // remove data and location as they will differ because of some extra white space
  for (var i=0;i<save_blocks.blocks.length;i++)
  {
    delete save_blocks.blocks[i].loc
    delete save_blocks.blocks[i].fields_loc
    delete save_blocks.blocks[i].data
    delete save_blocks.blocks[i].x
    delete save_blocks.blocks[i].y
    delete save_blocks.blocks[i].extraState
  }
    
  var short_to_long = {}
  // convert to text
  var text = JSON.stringify(save_blocks, undefined, 2);
  
  // replace id with line_nr+UNIQUE_ID
  for (var i=0;i<save_blocks.blocks.length;i++)
  {
    var block = save_blocks.blocks[i];
    // use line numbers instead of pos as they are resilient against tokens/values that become longer
    var pos = text.indexOf(block.id)
    // convert to line number note that the first occurance is found
    // can be a reference instead of the block id
    var temp = text.substring(0, pos);
    var line_nr = temp.split("\n").length

    // replace everywhere as it can be ids as well as references
    var unique_id = create_unique_id(line_nr, block.type)
    text = text.replaceAll(block.id, unique_id)
    // keep a reference from the unique_id to the orginal id
    short_to_long[unique_id] = block.id
  }
  return {text, short_to_long}
}

function saveFile()
{
    //var save_blocks = save_mergeable(workspace)
    var save_blocks = Blockly.serialization.workspaces.save(workspace);
    var data = JSON.stringify(save_blocks, undefined, 2);
    var blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    download('concrete.json', url)
};

function add_load()
{
  const inputElement = document.getElementById("input");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    for (let i = 0; i < this.files.length; i++) {
    var file = this.files[i];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
      var json = JSON.parse(evt.target.result);
      Blockly.serialization.workspaces.load(json, workspace)
      }
      reader.onerror = function (evt) {
      document.getElementById("error").innerHTML = "error reading file";
      }
    }
    }
  }
}

function replace_blocks(obj)
{
  var properties = Object.getOwnPropertyNames(obj)
  for (var j=0; j<properties.length;j++)
  {
    if (properties[j]=='block')
    {
      // remove the block but keep the id
      var id = obj.block.id
      delete obj.block
      obj.block = { "id": id }
    } 
    else if (typeof(obj[properties[j]])=='object')
    {
      replace_blocks(obj[properties[j]])
    }
  }
}

function inject_blocks(obj, saved_blocks)
{
    var properties = Object.getOwnPropertyNames(obj)
    for (var j=0; j<properties.length;j++)
    {
        if (properties[j]=='block')
        {
          obj.block = saved_blocks[obj.block.id]
        }
        // kind of strange that the type can be object and the value null 
        else if (typeof(obj[properties[j]])=='object' && obj[properties[j]]!=null)
        {
          inject_blocks(obj[properties[j]], saved_blocks)
        }
        else
        {
          // value, no need to process
        }
    }
}
const serialization_name = 'editor'

function mergeable_block(block)
{
  var json_obj = Blockly.serialization.blocks.save(block, {addCoordinates: true, 
    addInputBlocks: true, 
    addNextBlocks: true, 
    doFullSerialization: true})

  replace_blocks(json_obj)
  return json_obj
}

function save_mergeable(workspace)
{
  // what if we have two top blocks? during duplicate or creation
  // maybe the longest goes first, as the copy is always equal or smaller
  // than the original
  // so sort the topblocks first on 

  var save_blocks = {};
  var top_blocks = workspace.getTopBlocks()
  top_blocks.sort(function(a,b) {
    return a.getDescendants().length - b.getDescendants().length 
  })
  save_blocks['top_blocks'] = top_blocks.map(block => block.id);
  
  save_blocks.blocks = []
  for (var j=0;j<top_blocks.length;j++)
  {
    var blocks = top_blocks[j].getDescendants(true)
    for (var i=0; i<blocks.length;i++)
    {
        var json_obj = mergeable_block(blocks[i])
        save_blocks.blocks.push(json_obj)
    }
  }
  save_blocks['mergeable'] = true;
  // editor is the same as in register serialization 
  save_blocks[serialization_name] = saveFn(workspace); 
  
  return save_blocks
}

function load_mergeable(saved_blocks, workspace)
{
  var keys = Object.keys(saved_blocks)
  for (var i=0; i<keys.length;i++)
  {
        inject_blocks(saved_blocks[keys[i]],saved_blocks)
  }
  workspace.clear()
  for (var i=0; i<saved_blocks['top_blocks'].length;i++)
  {
    var id = saved_blocks['top_blocks'][i]
    Blockly.serialization.blocks.append(saved_blocks[id], workspace)
    }
  
  
}

function saveFn(workspace)
{
  if (workspace.name=='Concrete')
  {
    var version = 'latest'
    return { 'name': get_editor(), 
             'version' : 1.0
           }
  }
  else
  {
    return { 'editor': 'factory/' + workspace.name, 
             'version' : 1.0
           }
  }
}

function get_editor()
{
  var editor =  get_from_url("editor");
  if (editor==null) 
  {
    editor = "unknown"
  }
  return editor;
}

function get_from_url(param)
{
  var url_params = window.location.search;
  let params = new URLSearchParams(url_params);
    let editor = params.get(param); 
  
    return editor
}
