# Name: threenextreact

## LICENSE: MIT

## Create By: Lightnet

## Stage Dev:
- idea / prototyping

## Information:
  Work in progress build and testing ideas.
  
  To develop three.js on next.js with react build into the server side render. As well other packages to develop editor, game and other applocation build test.
  
  Threejs used react-three/fiber handle html react build render. To keep it very simple but have simple database with rect and sqlite for local build for game, editor and auth testing.

  As for the network in co-op plan is not yet build for editor and game multiplayer network by using web socket.

  Note that nextjs (https://nextjs.org/) server run differently that reduce route coding and config.

## code script:
- client: babel js
- Server: babel js

## Packages:
- @prisma/client 3.4.0
- @react-three/fiber 7.0.17
- next 12.0.2
- next-auth 4.0.0-beta.4
- react 17.0.2
- react-dom 17.0.2
- socket.io 4.3.1
- socket.io-client 4.3.2
- sqlite 4.0.23
- three 0.134.0
- prisma 3.4.0

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

## URLs:
- http://localhost:3000
- 

## Layout:

  By using the react to create components and entities components. To develop logic, network and other things.

  The network and database will handle some simple tests.

# dev url testing:
- http://localhost:5555/ web page
- http://localhost:3000/ database


```
$ prisma migrate dev --name init
$ prisma studio //view database and server database
```

# refs Links:
- https://nextjs.org/docs/getting-started

- React Three Fiber
  - https://docs.pmnd.rs/react-three-fiber/getting-started/examples#game-prototypes
  - https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls

# Notes: 
- PrismaClient setup is tricky when dealing with react, server and client code.
- div id __next css for threejs resize full screen config.


- gun.js testing...

# .env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"
```