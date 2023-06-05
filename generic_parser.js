// First, we must generate a JSON parser using:
//
//      lark-js json.lark -o json_parser.js
//
// Then we can run it with
//
//      node run_json_parser.js



const parser = get_parser({propagate_positions : true})//, tree_class:new MyTree()})

const START_POS = 0
const END_POS = 1

function print_token(input, token, indent)
{
    return ""//token.value
}

function print_tree(input, tree, indent)
{
    var text = new Array(indent + 1).join(' ') + tree.data + ":"
    text += "[" + tree._meta.start_pos + "-" + tree._meta.end_pos +"]:"
    text += input.slice(tree._meta.start_pos, tree._meta.end_pos).replace('\n', ' ')
    text += "\n"
    for (var i=0; i<tree.children.length; i++)
    {
        var child = tree.children[i];
        if (child instanceof Tree)
        {
            text += print_tree(input, child, indent+2)
        }
        if (child instanceof Token)
        {
            text += print_token(input, child, indent+2)
        }
    }
    return text
}

function create_token(input, token)
{
    block_json = {}
    block_json.type = 'token';
    block_json.fields = {}
    block_json.fields.VALUE = token.value;
    var l = token;
    block_json.data = { 'value': input.slice(l.start_pos, l.end_pos),
    'loc' : [ l.start_pos, l.end_pos, l.line, l.column, l.end_line, l.end_column],
    'fields_loc' : {'VALUE': [ l.start_pos, l.end_pos, l.line, l.column, l.end_line, l.end_column]},
    'changed': false}

    return block_json;
}

// language depended quite often depends on block_type
// or specific fields... should come from the language
function get_default_seperator(block_json)
{
    if (block_json.fields.NAME == "pair") return " : ";
    if (block_json.fields.NAME == "object") return ", \n";
    if (block_json.fields.NAME == "array") return ", \n";
    return ''
}
function get_default_opening_closing(block_json)
{
    var opening = '';
    var closing = '';
    if (block_json.fields.NAME == "object") 
    {   
        opening = "{"; 
        closing = "}";
    }
    if (block_json.fields.NAME == "array") 
    {
        opening = "["; 
        closing = "]";
    }
    
    return {opening, closing}
}

function get_last_child(block_json)
{
    if (block_json.next) return get_last_child(block_json);
    return block_json;

}

function create_tree(input, tree)
{
    var block_json = {}
    block_json.type = 'node'
    block_json.fields = {}
    block_json.fields.NAME = tree.data;
    block_json.data = ''
    block_json.inputs = {}
    block_json.inputs.CHILDS = {}

    var l = tree._meta;
    block_json.data = { 'value': input.slice(l.start_pos, l.end_pos),
                        'loc' : [ l.start_pos, l.end_pos, l.line, l.column, l.end_line, l.end_column],
                        'fields_loc' : {'NAME': [ l.start_pos, l.end_pos, l.line, l.column, l.end_line, l.end_column]},
                        'changed': false}

    var connect = block_json.inputs.CHILDS;

    for (var i=0; i<tree.children.length; i++)
    {
        var child = tree.children[i];
        if (child instanceof Tree)
        {
            let child_json = create_tree(input, child)

            connect.block = child_json;
            child_json.next = {}
            connect = child_json.next;
        }
        if (child instanceof Token)
        {
            var token_json = create_token(input, child)
            connect.block = token_json;
            token_json.next = {}
            connect = token_json.next;
        }
    }

    var seperator = get_default_seperator(block_json)
    var indent = '  ' // default indent is two spaces
    var {opening, closing} = get_default_opening_closing(block_json)

    if (tree.children.length>0)
    {
        if (block_json.data.loc[START_POS]==block_json.inputs.CHILDS.block.data.loc[START_POS])
        {
            opening = ''
            closing = ''
        }
        else
        {
            // all from the beginning till the first child or the end 
                                                // whole document location
            var end = Math.min(block_json.inputs.CHILDS.block.data.loc[START_POS]-block_json.data.loc[START_POS], 
                               block_json.data.value.length-1)
            opening = block_json.data.value.slice(0, end)

            var last_child = get_last_child(block_json)

            // from the end of the last child or end
            var begin = Math.max(end, last_child.data.loc[END_POS]-block_json.data.loc[START_POS])-1
            
            // last char of value
            closing = block_json.data.value.slice(begin, block_json.data.value.length)  
        }

        // seperator is sampled between between child 0 and child 1
        if (tree.children.length>1)
        {
            // end of child 0
            var end = block_json.inputs.CHILDS.block.data.loc[END_POS]
            // begin of child 1
            var begin = block_json.inputs.CHILDS.block.next.block.data.loc[START_POS]
            seperator = input.slice(end, begin)
        }

        // indent is number of spaces in de seperator after the \n till the end
        if (seperator.indexOf('\n')==-1)
        {
            indent = ''
        }
        else
        {
            indent = seperator.slice(seperator.indexOf('\n')+1,seperator.length-1)
        }
    }
    seperator_on_last = false
    block_json.data.tokens = {}
    block_json.data.tokens.CHILDS = {}
    block_json.data.tokens.CHILDS.seperator = seperator
    block_json.data.tokens.CHILDS.seperator_on_last = seperator_on_last
    block_json.data.tokens.CHILDS.before = opening
    block_json.data.tokens.CHILDS.after = closing
    block_json.data.tokens.CHILDS.indent = indent
    
    return block_json;
}

function parse_example(text) {
    var tree = parser.parse(text);
    console.log(print_tree(text, tree, 0));
    // match the structure of a Blockly.serialization.workspace.load and save
    return {blocks : {blocks : [create_tree(text,tree)]}}
}


