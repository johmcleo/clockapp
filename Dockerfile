FROM node

RUN mkdir /opt/clockapp
WORKDIR /opt/clockapp

COPY ./* /opt/clockapp/

RUN npm install

# expose port
EXPOSE 80

# start app
CMD [ "node", "/opt/clockapp/server.js" ]
