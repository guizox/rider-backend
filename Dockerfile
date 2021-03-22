FROM node:10

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node package.json ./
RUN npm install

COPY --chown=node . .

ENV HOST=0.0.0.0 PORT=3000 DEBUG_PORT=9229
EXPOSE ${PORT}
EXPOSE ${DEBUG_PORT}

ENTRYPOINT [ "npm", "start" ]
