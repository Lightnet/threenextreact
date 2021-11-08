# Name: threenextreact

## LICENSE: MIT

## Create By: Lightnet

## Stage Dev:
- Idea
- Prototyping

## Information:
  Work in progress builds and testing ideas.

  To develop 3D editor and game with three.js and next.js to create browser client game.

  It used next.js, react.js, threejs and other support packages to handle components and modules design. To render browser client to reduce page render by pre-render the client in server side.

  The database will be used to save and load data for editing and game to manage them in json format.

  Note that nextjs (https://nextjs.org/) server run differently that reduce route coding and config.

  Network co-op is just idea but not work on it yet for to deal with editor co-op.

## urls:
- http://localhost:3000/editor ( main / work in progress )
- http://localhost:3000/examples (tests)
- http://localhost:3000/ (entry point home page)

## TO DO LIST:
- account (added / partly working)
  - auth (simple user and password)
  - sign up (added / need work)
- editor
  - save (not build) 
  - load (not build) 
  - shape
    - add cube (add)
    - add plane (not build)
    - add sphere (not build)
    - add ... (not build)
  - camera (not build)
  - light (not build)
  - orbit camera ( added / work in progres )

  - scene panel
    - rename (work in progress)
    - visiable ( added )
    - remove ( added / needs work)
    - select ( added )
  - props
    - transform postion ( added )
    - rotation ( added )
    - scale ( added )
  - material  (not build)
  - texture  (not build)
  - model  (not build)
  - animation  (not build)
  - prefab entity  (not build)
- game  (not build)
  - load  (not build)
  - save  (not build)
  - config  (not build)

## Packages:
- @react-three/fiber 7.0.17
- next 12.0.2
- next-auth 4.0.0-beta.4
- react 17.0.2
- three 0.134.0
- mongoose 6.0.12
- jsonwebtoken 8.5.1

### Not Used:
- prisma 3.4.0
- @prisma/client 3.4.0
- react-dom 17.0.2
- socket.io 4.3.1
- socket.io-client 4.3.2
- sqlite 4.0.23

## Root:
 - components ( react components )
 - Page (url page / folder)
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

## dev url testing:
- http://localhost:5555/ web page
- http://localhost:3000/ database

# .env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://127.0.0.1/reactthree"
```

# refs Links:
- https://nextjs.org/docs/getting-started
- https://nextjs.org/

## React Three Fiber
- https://docs.pmnd.rs/react-three-fiber/getting-started/examples#game-prototypes
- https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls

# Notes: 
- PrismaClient setup is tricky when dealing with react, server and client code.
- div id __next css for threejs resize full screen config.
- gun.js tests

