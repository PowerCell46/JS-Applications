# Lit Html Configuration
1. initialize a project - <b>npm init --y</b>
2. install lit html - <b>npm i lit-html</b>
3. import lit html in the JS <b><i>module</i></b> file - import {html, render} from '.../node_modules/lit-html/lit-html.js';
    - Exact path to the **Node Modules**, finishing with **.js**!
4. import the JS file as **type="module"** in the HTML


# Lite Server Configuration
1. initialize a project - <b>npm init --y</b>
2. install lite server - **npm i lite-server**
3. add a start command in the **scripts** package.json - 
    ```json
    "scripts": {
        ...
        "start": "lite-server"
    }
    ```
4. run **npm start** to start the server


# Page JS Configuration
1. initialize a project - <b>npm init --y</b>
2. install page.js - **npm i page**
3. import page in the JS ***module*** file - import page from '.../node_modules/page/page.mjs';
    - Exact path to the **Node Modules**, finishing with **.mjs**!
4. import the JS file as **type="module"** in the HTML