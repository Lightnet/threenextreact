# Name: threenextreact

## LICENSE: MIT

## Create By: Lightnet

## code script:
- client: babel js
- Server: babel js

## Packages:
- @prisma/client 3.3.0
- @react-three/fiber 7.0.17
- next 11.1.2
- next-auth 4.0.0-beta.4
- react 17.0.2
- react-dom 17.0.2
- socket.io 4.3.1
- socket.io-client 4.3.2
- sqlite 4.0.23
- three 0.133.1
- prisma 3.3.0

## Information:
  Working on prototype for threejs build with nextjs, reactjs, socket.io, sqlite, prisma, react-three/fiber and other packages.

  To keep it very simple but have simple database with rect and sqlite for local build for game, editor and auth testing.

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
- http://localhost:5555/
- http://localhost:3000/

```
prisma init
prisma migrate dev
ask > init
prisma studio //vivew database
```
# refs Links:
- https://nextjs.org/docs/getting-started

# Notes: 
- PrismaClient setup is tricky when dealing with react, server and client code.
