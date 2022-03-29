# Name: threenextreact

## LICENSE: MIT

## Created By: Lightnet

## Stage Dev:
- Idea / Prototyping
- Un/Stable builds.
- components/three <- stable (three editor)
- Note some files may change and folders for matching UI and name meaning.

# Project:
  I ported same project to vue js as to learn and compare frameworks. It almost the same layout just the code design is little different.
- https://github.com/Lightnet/vuethreeeditor

## Test Build:

- https://stackblitz.com/edit/node-zby8hd
```
npm run devn
```


## Information:
  Work in progress builds and testing ideas.

  To develop Three.js editor with React and React-Three-Fiber. 

  For game and other applications that is on hold a bit.
  
  As well other packages to help create editor module design.

  By using the three/fiber with React.js components to handle user input and query api to develop sandbox game world or application. To do visual editing on local development build a simple game, visual art and other things. Required creating components and api calls.

  Network co-op is just idea but not work on it yet for to deal with editor co-op.

### Entity and object3D:

  To handle objects from three and other communities packages that predefine name. It would used entity prefixed entity as the canvas can render threejs object3d and filters. The three packages will be test or used when the editor and game is being built.

  The idea base on the graph save database with json file format.

## GUI / UI:
  The idea is have modular build but required testing ideas.

  Since the raectjs is module components.

  But it required to set up the user interface to scale with camera as there no pipline but user made UI.

  The idea base on flex. Need to test later.

- https://github.com/pmndrs/react-three-flex  

### Database:
 The database will be used is MongoDB to able save and load data for editing and game to manage them in json format.

## React Three Editor:
- Server package:
  - Next.js ( tested, work in progress )
  - Express.js ( tested, work in progress )

- Editor:
  - UI
    - camera 
    - simple ( work in progress )
    - modules
    - script
    - 
  - Entity:
    - Save ( added )
    - Update ( added / position / rotation / scale )
    - Delete ( added )
    - List ( added )
    - physics ( added / work in progress)
    - add component ( added / work in progress )
    - parent / child ( not added )
  - Scene:
    - Create ( Added )
    - Delete ( added / wip )
    - Update ( added )
    - List ( added )
    - default ( added ) project sceneid load default
    - load scene ( added )
  - Material:
    - UI (work in progress)
    - List ( not added )
    - Add (work in progress)
    - Delete ( not added )
    - Box ( Testing )

- Projects:
  - Create ( added )
  - Delete ( added )
  - Update ( added )
  - List ( added )

- Assets:
  - upload file types ( added / work in progress)
  - download ( not added )
  - save to database 
    - as base64 string ( Not Added )
    - save file name and path ( added )
  - delete ( added )
  - file limit size check ( 5 MB) ( added)
  - check file type ( added / work in progress)
  - update ? (data store in database or local file ?)

- Three Objects: (work in progress)
  - Scene ( not added )
  - Group ( added )
  - Box ( added )
  - Sphere ( added )
  - Plane ( added )
  - Cone ( added )
  - Cylinder ( added )
  
  - OrthographicCamera ( added / placeholder )
  - PerspectiveCamera ( added / placeholder )
  - Camera ( work in progress)
  - Light ( added )
  - PointLight ( added )
  - AmbientLight ( added )
  - OrbitControl ( added )

- Physics: ( work in progress )
  - toggle physics on and off ( added )
  - add entity enable physics ( added )
  - needs rework later on layout in json
  - Simple test cube and plane. ( Tested )
### Notes:
- They do not have parent or children yet.

- UI:
  - Modal ( added )
  - Sidebar ( work in progress )

# Packages:
- three ( 3D/2D render )
- react 
- react-dom 
- @react-three/fiber ( react for three handle components )  https://github.com/pmndrs/react-three-fiber 
- @react-three/cannon
- @react-three/drei 
- jsonwebtoken (secure check token)
- mongoose ( database )
- dayjs (time stampe)
- nanoid (random id gen)
- react (web browser)
- webpack 5 (Next.js build in for dev)
- socket.io ( for user co-op editing. not build)
## next.js:
- next-auth ( auth check user login )
- next (react server pre-render)
- Server Next.js, pre-render, react.js and compiler.
## express.js:
- express
- Server with simple express, react and webpack with simple request api. That is bundle to one javascript file.

# Physics:
  After some testing for enable and disable physics react components. 
  
```js
const ref = useref()
// for physics
const [ref, api] = useBox()
```
  
  The use of the useref() and useBox() has conflict change variable in render. Had to create two components that same but the varible is different. There are two call from entity object3D isPhysics and enablePhysics global varaible. One is reason it build the world not enable physics to place holder and other is debug simulation.

## 3D Plane:
  There is no args that x and y is infinite. Used box shape for better collision.
- https://github.com/pmndrs/use-cannon/blob/master/src/propsToBody.js#L41

## Root dir project:
 - src ( server files )
    - three ( work in progress)
 - app.mjs ( express server )
 - components ( react components )
 - lib (helper / database / server /client)
 - pages (url page / folder / next.js server /api )
    - api (server request, respone / folder)
      - auth ( next-auth )
    - _app.js ( default config nextjs )
    - _document.js ( default config nextjs )
    - index.js (main entry user custom code)
    - filename.js (testing)
 - next.config.js (server config / webpack)
 - client.js (web browser client js)
 - webpack.config.cjs ( webpack compiler react babel)
 - .babelrc ( config compiler react babel)

## Layout:
  By using the react to create components and entities components. To develop logic, network and other things.

  The network and database will handle some simple tests.

# Setup:

  Need to install nodejs, mongodb and other IDE editor of your choice.

Command line:
```
$ npm install
```
- install packages

```
$ npm run dev (working for next.js)
```
- run the server from npm package from package.json script

```
$ npm run devn (working for express.js / current )
```
- run the server from npm package from package.json script

# Configs:

Note before sure how to add into the config or you might override the next.js configs.

There are two type one is [] and other is {}.

next.config.js
```js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      //add into the array
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      }
    }
    return config;
  }
}
```

# .env
```
PORT=3000
HOST="localhost"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://127.0.0.1/reactthree"
SECRET=""
```

# Refs Links:
- https://nextjs.org/docs/getting-started
- https://nextjs.org/

## React Three Fiber
- https://docs.pmnd.rs/react-three-fiber/getting-started/examples#game-prototypes
- https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls

# Notes: 
- PrismaClient setup is tricky when dealing with react, server and client code.
- div id __next css for threejs resize full screen config.

# npm command:
```
$ npm update //clean up unused packages

https://www.npmjs.com/package/npm-check-updates
$ npm install -g npm-check-updates

$ ncu // check package to updates
```

# Credits:
  Thanks to search engine and the people working on react, three, three-fiber and other forums. For finding the problems.
## 
 - react-three-fiber as @react-three/fiber
 - https://github.com/pmndrs/react-three-fiber
 - https://github.com/pmndrs/react-three-fiber/issues/43

## svgrepo:
  Free svg icons.
- https://www.svgrepo.com