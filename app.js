"use strict";
var _a;
exports.__esModule = true;
exports.DEFAULT_REACT_FILES = exports.DEFAULT_REACT_LOADING_FILES = void 0;
//import { FireJetSaveFile } from "@firejet-sync/types";
var SHIM_CONSTANTS_1 = require("./SHIM_CONSTANTS");
var parser = require("@babel/parser");
var saveFile = {
    pages: {
        main: {
            componentData: [
                {
                    type: "EXISTING_COMPONENT",
                    x: 100,
                    y: 400,
                    width: 300,
                    height: 400,
                    filePath: "/App.jsx",
                    exportName: "default"
                },
                {
                    type: "EXISTING_COMPONENT",
                    x: 700,
                    y: 0,
                    width: 500,
                    height: 100,
                    filePath: "".concat(SHIM_CONSTANTS_1.ARBITRARY_COMPONENT_FOLDER_PATH, "/1/HelloWorld.js"),
                    exportName: "default"
                },
            ]
        }
    },
    version: { major: 0, minor: 0, patch: 0 }
};
//todo: make sure all the processors are available here 
var packageJson = {
    dependencies: {
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "react-scripts": "^4.0.0",
        "@babel/traverse": "^7.20.10",
        "express": "^4.18.2",
        "prettier": "^2.8.1"
    },
    main: "/index.js",
    devdependencies: {
        "@types/babel__generator": "^7.6.4",
        "@types/babel__traverse": "^7.18.3",
        "@types/express": "^4.17.15",
        "@types/node": "^18.11.18",
        "@types/prettier": "^2.7.2"
    }
};
exports.DEFAULT_REACT_LOADING_FILES = {
    "/App.tsx": {
        code: /*tsx*/ "export default function App() {\n        return <div style={{width: \"100%\", height:\"90vh\", overflow:'none', display:\"grid\", placeItems:\"center\"}}><svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"72px\"\n        height=\"72px\"\n        viewBox=\"0 0 100 100\"\n        enableBackground=\"new 0 0 0 0\"\n      >\n        <path\n          fill=\"#24252C\"\n          d=\"M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50\"\n        >\n          <animateTransform\n            attributeName=\"transform\"\n            attributeType=\"XML\"\n            type=\"rotate\"\n            dur=\"1s\"\n            from=\"0 50 50\"\n            to=\"360 50 50\"\n            repeatCount=\"indefinite\"\n          />\n        </path>\n    </svg></div>\n    }"
    }
};
//TODO: Figure out why tailwind is so obsessed with compiling bg-[xyz] causing our compile to fail when the file is not there
exports.DEFAULT_REACT_FILES = (_a = {
        "/App.jsx": {
            code: /*tsx*/ "\n    import \"./styles.css\"\n\n    export default function App() {\n\n\n        return (\n          <div className=\"flex gap-2 w-[300px] h-[400px] bg-slate-500 p-4\">\n            <p>This text is big Hmm</p>\n            <div className=\"bg-blue-400 w-8 h-8\" />\n            <div className=\"bg-red-400 w-8 h-8\" />\n            <div className=\"bg-green-400 w-8 h-8\" />\n          </div>  \n        )\n      }\n      "
        }
    },
    _a[SHIM_CONSTANTS_1.FIREJET_SAVE_DATA_PATH] = {
        //TODO: When filenames are the same it may throw errors
        code: JSON.stringify(saveFile)
    },
    _a["".concat(SHIM_CONSTANTS_1.ARBITRARY_COMPONENT_FOLDER_PATH, "/1/HelloWorld.js")] = {
        code: /*tsx*/ "export default function HelloWorld() {return <p>\n      Test Test 123\n      <br />\n      Test 2 1245\n      <br />\n      <b>\n        <u>Wowzer</u>\n      </b>\n      <div>Testing</div>\n      <div>\n\n        <b style={{ textDecorationLine: \"underline\"}}>Hee </b>\n        <i>ha ha</i>\n        </div>\n    </p>}"
    },
    _a["/tailwind.config.js"] = {
        code: "/** @type {import('tailwindcss').Config} */\n    module.exports = {\n      content: [\"./**/*.{js,jsx,ts,tsx}\"],\n      theme: {\n        extend: {},\n      },\n      plugins: [],\n    };\n    "
    },
    //TODO: For font styles only import whatever is used in the project
    //TODO: For fonts not available on google fonts, throw error and ask user to provide font
    _a["/styles.css"] = {
        code: "\n    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');\n\n    @tailwind base;\n    @tailwind components;\n    @tailwind utilities;\n\n    \n\n body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: auto;\n  -moz-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: auto;\n  text-rendering: optimizeLegibility;\n  font-smooth: always;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n\nh1 {\n  font-size: 1.5rem;\n}"
    },
    _a["/public/index.html"] = {
        code: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Document</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n  </body>\n</html>"
    },
    _a["/package.json"] = {
        code: JSON.stringify(packageJson)
    },
    _a);
var AST_reader = function (text) {
    return parser.parse(text, { sourceType: "module" });
};
var code = "function square(n) {\n  return n * n;\n}";
console.log(AST_reader(code));
//TODO: Inject dependencies for packagejson better and DO NOT clash with user dependencies
