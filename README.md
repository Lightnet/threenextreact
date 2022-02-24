# Name: threenextreact

## LICENSE: MIT

## Created By: Lightnet

## Stage Dev:
- Idea
- Prototyping
- Unstable builds.
- Reworking the React Three Editor setup.

## Information:
  Work in progress builds and testing ideas.

  To develop Three.js editor with React and React-Three-Fiber. 

  For game and other applications that is on hold a bit.
  
  As well other packages to help create editor module design.

  By using the three/fiber with React.js components to handle user input and query api to develop sandbox game world or application. To do visual editing on local development build a simple game, visual art and other things. Required creating components and api calls.

  Network co-op is just idea but not work on it yet for to deal with editor co-op.
  
### Next.js:
  Server React and pre-render react.js is on hold.

- next.js (on hold / broken api )
  
### Express.js:
  Server with simple react webpack stand with simple request api.

- express.js ( revamping the code layout / work in progress )
  - rework to have stand alone
  
### Database:
 The database will be used is MongoDB to able save and load data for editing and game to manage them in json format.

## React Three Editor:
- Server package:
  - Next.js ( broken )
  - Express.js ( tested, work in progress )

- Editor:
  - Entity:
    - Save ( added )
    - Update ( added / position / rotation / scale )
    - Delete ( added )
    - List ( added )
  - Scene:
    - Create ( Added )
    - Delete ( not added )
    - Update ( not added )
    - List ( not added )

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
  - update ?

- Three Objects: (work in progress)
  - Scene ( not added )
  - Group ( added )
  - Box ( added )
  - Sphere ( added )
  - Plane ( added )
  - Cone ( added )
  
  - Camera ( work in progress)
  - Light ( added 
  - PointLight ( added )
  - AmbientLight ( added )
  - OrbitControl ( added )
  

Notes:
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
- next-auth ( auth check user login )
- next (react server pre-render)
- dayjs (time stampe)
- nanoid (random id gen)
- react (web browser)
- webpack 5 (Next.js build in for dev)
- socket.io ( for user co-op editing. not build)
- express

# Next Three ToDoList:
  [Next Three Doc To Do List](/docs/nextthree.md)

# Express Three ToDoList:
  [Express Three Doc To Do List](/docs/expressthree.md)

# Physics:
  After some testing for enable and disable physics react components. useref and usecontext has conflict change variable in render. Had to create two component that same but the varible is different. It possible to change some variable but need two check for isPhysics and enablePhysics. One is reason it build the world not enable physics to place holder and other is debug simulation.

## 3D Plane:
  There is no args that x and y is infinite. Used box shape for better collision.
- https://github.com/pmndrs/use-cannon/blob/master/src/propsToBody.js#L41

## Root dir project:
 - src ( server files )
    - editor (old build)
    - three (new build / work in progress)
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
$ npm run dev (not being used might break some changes.)
```
- run the server from npm package from package.json script

```
$ npm run devn (current testing)
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
- gun.js tests
- Reworking the array format for easy build. To handle react component update call.

# npm command:
```
$ npm update //clean up unused packages

https://www.npmjs.com/package/npm-check-updates
$ npm install -g npm-check-updates

$ ncu // check package to updates
```

# DESIGN:THREE (work in progress)
- editor modular component
- there are main and sub component to handle editor.
- main where the editor handle call from sub childrens.
  - compoent rely on call backs and event to handle 
- sub compoent are out side of the editor like window tabs. It would required some web socket events.

# DESIGN: API (work in progress)
- fetch and query
- to handle json object format.
- database save, load, edit and delete on server
- need auth and access key between layers

# DESIGN:UI: (work in progress)
- three.js ui or html ui for game or editor.
- game entity components predefine.
- 

# DESIGN:REACT (work in progress)
- to handle custom or script ui to fix the editor signal event for ease of access variables.
- 

# Credits:
## svgrepo:
  Free svg icons.
- https://www.svgrepo.com