# Name: threenextreact

## LICENSE: MIT

## Created By: Lightnet

## Stage Dev:
- Idea
- Prototyping
- Unstable builds.

# Packages:
- three ( 3D/2D render )
- @react-three/fiber ( react for three handle components )  https://github.com/pmndrs/react-three-fiber 
- jsonwebtoken (secure check token)
- mongoose ( database )
- next-auth ( auth check user login )
- next (react server pre-render)
- dayjs (time stampe)
- nanoid (random id gen)
- react (web browser)
- socket.io ( for user co-op editing. not build)

## Information:
  Work in progress builds and testing ideas.

  To develop 3D editor and game with Next.js, React.js, Three.js and three/fiber to create browser client game or application. Used Next.js with built in server, api and React.js to prerender browser client page render. Three.js does have other third party packages to handle React.js components in modules design. The database will be used is MongoDB to able save and load data for editing and game to manage them in json format. Note that nextjs (https://nextjs.org/) server run differently that reduce route coding and config.

  By using the three/fiber with React.js components to handle user input and query api to develop sandbox game world or application. To do visual editing on local development build a simple game current set. Required creating components and api calls.

  Network co-op is just idea but not work on it yet for to deal with editor co-op.

## Dev urls:
- http://localhost:3000/editor ( main / work in progress )
- http://localhost:3000/examples (tests)
- http://localhost:3000/app (tests / not added any feature yet.)
- http://localhost:3000/ (entry point home page)
- http://localhost:5555/ database (not in used)

## TO DO LIST:
- account / auth (added / partly working)
  - auth (simple user and password)
  - sign up (added / need work)
  - third partly sign token (not build)

- UI
  - button (work in progress)
  - input (work in progress)
  - window (work in progress)
  - modal (work in progress)
  - sidebar (work in progress)
  - 

- upload file types (work in progress)
  - save to database as base64 string
  - delete (not added)
  - file limit size check? (not added)
  - check file type (not added)
  - update ?
  
- load image (testing)
  - png (tested)

- project work space
  - list (added)
  - update/edit (added)
  - delete (added)
    - sub folders (not build)

- editor
  - auto save and load when user interact with the object3D  
  - save (added) 
    - database  (partly working)
  - load (added ) 
    - database (partly working)
  - shape / object type
    - box (added)
    - circle (added)
    - cone (added)
    - point light (added)
    - camera (added)
    - plane (added)
    - sphere (not build)
  - orbit camera ( added / work in progres )

  - prop view panel (work in progress)
    - scene (added)
    - scenes (added)
    - object props (added)
    - object3ds (added)
    - objectdatas (added)

  - object3d
    - database save and load (partly working)
    - create object (add base secene id)
    - delete object (add base secene id)
    - update object (add base secene id)
    - move another scene  (not build)
    - prefab (not added / need parent code script id and tags)
    - delete save object3d if accident remove from scene.

  - scene panel
    - database save and load (partly working)
    - object3d list (added )
    - object3d delete (added)
    - object3d rename (not added / random name)
    - object3d select ( added )
    - object3d list update (added)
    - object3d visiable ( added )
    
  - (view/scenes)
    - create (added)
    - edit (added)
    - delete (added)
    
  - props
    - position ( added )
    - rotation ( added )
      - radian / degree (added)
    - scale ( added )

  - material  (not build)
    - create
    - update
    - delete

  - texture  (not build)
    - create
    - update
    - delete

  - model  (not build)
    - create
    - update
    - delete

  - animation  (not build)
    - create
    - update
    - delete

  - prefab entity  (not build)
    - create
    - update
    - delete
  
  - physics (work in progress)
    - plane (added)
    - box (added)
    - sphere (not added)
    - cylinder (not added)

- debug (work in progress)
  -  simple physics test

- game (not build)
  - delete  (not build)
  - load  (not build)
  - save  (not build)
  - config  (not build)

# Physics:
  After some testing for enable and disable physics react components. useref and usecontext has conflict change variable in render. Had to create two component that same but the varible is different. It possible to change some variable but need two check for isPhysics and enablePhysics. One is reason it build the world not enable physics to place holder and other is debug simulation.

## 3D Plane:
  There is no args that x and y is infinite. Used box shape for better collision.
- https://github.com/pmndrs/use-cannon/blob/master/src/propsToBody.js#L41

## Packages:
- @react-three/fiber 
- @react-three/cannon
- @react-three/drei 
- next 
- next-auth 4.0.0-beta.26
- react 
- three 0.134.0
- mongoose 6.0.12
- jsonwebtoken 
- webpack 5 (Next.js build in for dev)

### Not Used:
- prisma 
- @prisma/client 
- react-dom 
- socket.io 
- socket.io-client 
- sqlite 4.0.23

## Root:
 - components ( react components )
 - lib (helper / database / server /client)
 - pages (url page / folder)
    - api (server request, respone / folder)
      - auth ( next-auth )
    - _app.js ( default config nextjs )
    - _document.js ( default config nextjs )
    - index.js (main entry user custom code)
    - filename.js (testing)
 - prisma ( folder and database)
 - next.config.js (server config / webpack)

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
$ npm run dev
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
HOST="http://localhost:3000"
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
- there are main and sub component to handle editor.
- main where the editor handle call from sub childrens.
  - compoent rely on call backs and event to handle 
- sub compoent are out side of the editor like window tabs. It would required some web socket events.
- 

# DESIGN: API (work in progress)
- server to client
- client to server
- to handle json object format.
- database save and load on server
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