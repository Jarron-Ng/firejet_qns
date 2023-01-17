import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
//import { FireJetSaveFile } from "@firejet-sync/types";
import {
  ARBITRARY_COMPONENT_FOLDER_PATH,
  FIREJET_SAVE_DATA_PATH,
} from "./SHIM_CONSTANTS";

import traverse from "@babel/traverse";
import * as parser from "@babel/parser";
import prettier from "prettier";


const saveFile = {
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
          exportName: "default",
        },
        {
          type: "EXISTING_COMPONENT",
          x: 700,
          y: 0,
          width: 500,
          height: 100,
          filePath: `${ARBITRARY_COMPONENT_FOLDER_PATH}/1/HelloWorld.js`,
          exportName: "default",
        },
      ],
    },
  },
  version: { major: 0, minor: 0, patch: 0 },
};

//todo: make sure all the processors are available here 
const packageJson = { 
  dependencies: { 
    "react": "^18.0.0", 
    "react-dom": "^18.0.0", 
    "react-scripts": "^4.0.0", 
    "@babel/traverse": "^7.20.10",
    "express": "^4.18.2",
    "prettier": "^2.8.1",
  }, 
  main: "/index.js", 
  devdependencies: {
    "@types/babel__generator": "^7.6.4",
    "@types/babel__traverse": "^7.18.3",
    "@types/express": "^4.17.15",
    "@types/node": "^18.11.18",
    "@types/prettier": "^2.7.2"
  }, };

export const DEFAULT_REACT_LOADING_FILES: SandpackBundlerFiles = {
  "/App.tsx": {
    code: /*tsx*/ `export default function App() {
        return <div style={{width: "100%", height:"90vh", overflow:'none', display:"grid", placeItems:"center"}}><svg
        xmlns="http://www.w3.org/2000/svg"
        width="72px"
        height="72px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
      >
        <path
          fill="#24252C"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
    </svg></div>
    }`,
  },
};

//TODO: Figure out why tailwind is so obsessed with compiling bg-[xyz] causing our compile to fail when the file is not there
export const DEFAULT_REACT_FILES: SandpackBundlerFiles = {
  "/App.jsx": {
    code: /*tsx*/`
    import "./styles.css"

    export default function App() {


        return (
          <div className="flex gap-2 w-[300px] h-[400px] bg-slate-500 p-4">
            <p>This text is big Hmm</p>
            <div className="bg-blue-400 w-8 h-8" />
            <div className="bg-red-400 w-8 h-8" />
            <div className="bg-green-400 w-8 h-8" />
          </div>  
        )
      }
      `,
  },
  [FIREJET_SAVE_DATA_PATH]: {
    //TODO: When filenames are the same it may throw errors
    code: JSON.stringify(saveFile),
  },
  [`${ARBITRARY_COMPONENT_FOLDER_PATH}/1/HelloWorld.js`]: {
    code: /*tsx*/`export default function HelloWorld() {return <p>
      Test Test 123
      <br />
      Test 2 1245
      <br />
      <b>
        <u>Wowzer</u>
      </b>
      <div>Testing</div>
      <div>

        <b style={{ textDecorationLine: "underline"}}>Hee </b>
        <i>ha ha</i>
        </div>
    </p>}`,
  },
  "/tailwind.config.js": {
    code: `/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    `,
  },
  //TODO: For font styles only import whatever is used in the project
  //TODO: For fonts not available on google fonts, throw error and ask user to provide font
  "/styles.css": {
    code: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    

 body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}`,
  },
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  },
  "/package.json": {
    code: JSON.stringify(packageJson),
  },
};

const AST_traverser = (str: string) => {
  const ast = parser.parse(str, { sourceType: "module", plugins: ["jsx", "typescript"] })
  //console.log(ast);
  traverse(ast, {
    // somehow extract leading comments
    enter(path) {
      console.log(path.node.leadingComments);
    },
  });
};

// const code = /*jsx*/ `function square(n: any) {
//   return n * n;
// }`;

AST_traverser(DEFAULT_REACT_LOADING_FILES["/App.tsx"].code);
//AST_traverser(DEFAULT_REACT_FILES["/App.jsx"].code);
//const ast = parser.parse(`${code}`, { sourceType: "module", plugins: ["jsx", "typescript"] });
//console.log(ast);

function lint(code: string) {
  return prettier.format(code);
}
console.log(lint(DEFAULT_REACT_LOADING_FILES["/App.tsx"].code));

//TODO: Inject dependencies for packagejson better and DO NOT clash with user dependencies