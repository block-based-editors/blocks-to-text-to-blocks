
Link to edit the drawio picture. 
https://app.diagrams.net/#Hblock-based-editors%2Fblocks-to-text-to-blocks%2Fmain%2Fblocks_to_text_to_blocks.drawio

Link to Github blocks
https://blocks.githubnext.com/block-based-editors/blocks-to-text-to-blocks


develop folder contains the develop
Start the editor.html to use the editor. Open the example.json

conda activate python3

pip install lark-js

lark-js -o python3_parser.js python3.lark

add "var module = {}" to the python3_parser.js

change the import the wanted *_parser.js in editor.html

For now a json_parser.js and python3_parser.js are available. 

Just open the editor.html in a browser no need for a server.

https://block-based-editors.github.io/blocks_to_text_to_blocks/editor.html

