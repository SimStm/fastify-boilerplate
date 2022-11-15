# Fastify API Boilerplate
This boilerplate contains the Fastify API Framework, plus some plugins which I consider very useful.

Basically it has some essential plugins and components already set up:

- Swagger
- Prisma (currently using MongoDB but could be changed to any database)
- Auto Routes
- Auto Plugins
- CORS and Helmet (to protect headers)

## Prisma
To use Prisma, don't forget to create a `.env` file in your project root, and add the following line:
```
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@HOST:PORT/DATABASE?retryWrites=true&w=majority"
```
---
Feel free to use and suggest some improvements through PR.