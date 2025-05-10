FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "production" ]; then \
        npm install; \
    else \
        npm install; \
        npm install -g nodemon; \
    fi

COPY . .

EXPOSE 8000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD if [ "$NODE_ENV" = "production" ]; then \
        npm start; \
    else \
        npm run start:dev; \
    fi
