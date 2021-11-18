https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete





https://next-auth.js.org/adapters/prisma
https://stackoverflow.com/questions/69219455/how-to-use-next-auth-with-github-and-prisma
https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
- https://www.youtube.com/watch?v=FMnlyi60avU Prisma - The Easiest Way to Work with a Database in Next.js
- https://github.com/chenkie/next-prisma

//===============================================
// DATABASE
//===============================================
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model User {
  id            Int       @default(autoincrement()) @id
  name          String?
  email         String?   @unique
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @updatedAt @map(name: "updated_at")
  posts         Post[]
  @@map(name: "users")
}

```js
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { ...pageProps },
}) {
  console.log("_app server data");
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```