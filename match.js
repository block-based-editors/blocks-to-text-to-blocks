

function match_replace_top(pattern_block, replace_block, workspace_blocks_json)
// pattern_block is the matcher
// will be replaced by the replace block
// workspace_blocks_json is in/out will be replaced in place  
{
  if (pattern_block)
  {
    var pattern_block_json = Blockly.serialization.blocks.save(pattern_block, {addCoordinates:true, addInputBlocks:true, addNextBlocks:true});
    
    var top_blocks_json = workspace_blocks_json.blocks.blocks;

    var code = ''
    for (var i=0;i<top_blocks_json.length;i++)
    {
      // workaround for function below to work they expect a block indirection also introduce one here
      var top_blocks_json_holder = {}
      top_blocks_json_holder.block = top_blocks_json[i]
      code += match_replace_block_visitor(top_blocks_json_holder, pattern_block_json, replace_block)
      // and place the replaced json back in the array
      top_blocks_json[i] = top_blocks_json_holder.block
    }
  }
  
  return code;
}

function match_replace_block_visitor(json_block_holder, pattern_block_json, replace_block)
{
  if (!json_block_holder.block)
  {
    return "";
  }
  var code = match_replace_block(json_block_holder, pattern_block_json, replace_block)
  if (json_block_holder.block.next)
  {
    code += match_replace_block_visitor(json_block_holder.block.next, pattern_block_json, replace_block)
  }
  if (json_block_holder.block.inputs)
  {
    for (const [key, input_block] of Object.entries(json_block_holder.block.inputs)) {
      code += match_replace_block_visitor(input_block, pattern_block_json, replace_block)

    }
  }
  return code;
}

function match_replace_block(json_block_holder, pattern_block_json, replace_block)
{
  var found;
  var variables;
  var code = '';
  var block_json = json_block_holder.block;

  [ found, variables ] = match(pattern_block_json, block_json);

  if (found && replace_block)
  {
    code += block_json.type + '\n'
    for (var j=0;j<variables.length;j++)
    {
      var variable = variables[j];
      // some variable debugging to the code view
      code += '  ' + variable.name + ':' + variable.new_value + ' ' + variable.loc + '\n'
    }
    // replace variables by values
    var replace_block_json = Blockly.serialization.blocks.save(replace_block, {addCoordinates: true, addInputBlocks: true, addNextBlocks: true});
    // make a reference to the data with loc and value
    replace_block_json.data = block_json.data
    // replace variables by values
    for (var j=0;j<variables.length;j++)
    {
      // TODO here the loc should also be replaced 
      var variable = variables[j];
      // TODO the parent is here not the parent but itself...
      replace_block_json = replace_variable(replace_block_json, variable.name, variable.new_value, variable.loc, variable.tokens, replace_block_json)
      
    }

    var end_replace_block_json = replace_block_json
    // the replacement block can have several next blocks
    while(end_replace_block_json.next)
    {
      end_replace_block_json = end_replace_block_json.next.block
    }
    
    // connect the next blocks
    end_replace_block_json.next = block_json.next

    // place the new block in the tree
    json_block_holder.block = replace_block_json

  }
  return code
}

function match(pattern, block, parent) {
    if (pattern.type == "match_tree")
    {
      // store the location data of the parent
      return [true, [{"name": pattern.fields["TREE"], 
                      "new_value": block, 
                      "loc": parent.data.loc,
                      "tokens": parent.data.tokens.CHILDS}]] 
    }
    if (!block)
    {
        return [false, []];
    }
  
    if (pattern.type != block.type) {
        return [false, []];
    }
  
    if (pattern.fields && !block.fields)
    {
        return [false, []];
    }
  
    if (pattern.next && !block.next)
    {
        return [false, []];
    }
    
  
    // the fields should match or they should be variable
    var saved_variables = [];
    for (var pattern_field in pattern.fields) {
        if (pattern.fields[pattern_field].startsWith('$')) {
            // something like: $v:"$v".startsWith("A")
            var array = pattern.fields[pattern_field].split(":");
            if (array.length==2)
            {
              var eval_str = array[array.length - 1].replace(array[0], block.fields[pattern_field])
              console.log( eval_str)
              try {
                if( eval(eval_str))
                {

                  saved_variables.push({"name":array[0], 
                                        "new_value": block.fields[pattern_field], 
                                        "loc": block.data.fields_loc[pattern_field],
                                        "tokens": block.data.tokens.CHILDS});
                }
              }
              catch
              {
                console.log('Eval failed')
              }
            }
            else // no filter is specified
            {  
              var loc = null;
              var tokens = null;
              if (block.data && block.data.fields_loc)
              {
                loc = block.data.fields_loc[pattern_field]
              }
              if (block.data && block.data.tokens)
              {
                tokens = block.data.tokens.CHILDS
              }

              saved_variables.push({"name":pattern.fields[pattern_field], 
                                    "new_value":block.fields[pattern_field], 
                                    "loc":loc,
                                    "tokens":tokens});
            }
          
        } else if (pattern.fields[pattern_field] != block.fields[pattern_field]) {
            return [false, {}];
        }
    }
    // if there are children they should match (or match_block)
    if (pattern.inputs)
    {
      for (const [key,pattern_child] of Object.entries(pattern.inputs))
      {
          var found = false;
          var child_save_variables = [];
          var input_block = null;
          if (block.inputs && block.inputs[key])
          {
            input_block = block.inputs[key].block
          }
          
          [found, child_save_variables] = match(pattern_child.block, input_block, block)
          if (found) {
              saved_variables.push(...child_save_variables)
              break;
          }
          
          if (!found) {
              return [false, {}];
          }
      }
    }
    // if there is a next block they should match
    if (pattern.next && block.next)
    {
      var found;
      var child_save_variables = [];
      [found, child_save_variables] = match(pattern.next.block, block.next.block)
      if (found) {
        saved_variables.push(...child_save_variables)
      }
      else
      {
        return [false, {}];
      }
    }
    return [true, saved_variables];
  }


  function replace_variable(replace_block, variable, new_value, loc, tokens, parent)
// if variable is from a match_tree (by default $tree, than new_value is also a tree)
// if variable is from field (by default $value than new_value is also a value)
// parent is need to store some location info on childs
{
  // nothing to replace: stop the recursion
  if (!replace_block)
  { 
    return replace_block
  }
  if (replace_block.type == "match_tree" && variable == replace_block.fields['TREE'])
  {
    replace_block = new_value;
  }
  if (replace_block && replace_block.fields)
  {
    for (const [key,value] of Object.entries(replace_block.fields))
    {
      if (value==variable)
      {
        replace_block.fields[key] = new_value
        replace_block.data = replace_block.data || {};
        replace_block.data.fields_loc = replace_block.data.fields_loc || {};
        replace_block.data.fields_loc[key] = loc;
      }
    }
  }

  // walk the next and inputs with the same replacement
  if (replace_block && replace_block.next)
  {
    replace_block.next.block = replace_variable(replace_block.next.block, variable, new_value, loc, tokens, replace_block)
  }
  
  if (replace_block && replace_block.inputs)
  {
    for (const [key, input_block] of Object.entries(replace_block.inputs)) 
    {
      input_block.block = replace_variable(input_block.block, variable, new_value, loc, tokens, replace_block)
      parent.data.inputs_loc = parent.data.inputs_loc || {};
      parent.data.inputs_loc[key] = loc
      parent.data.tokens[key] = tokens
    }
  }
  return replace_block;
}