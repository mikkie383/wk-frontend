FROM node:14.15

ARG WORK_DIR=/frontend

#use for ng command
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}

WORKDIR ${WORK_DIR}

COPY package*.json ${WORK_DIR}

RUN npm install @angular/cli
RUN npm install
RUN npm install --save @angular/material @angular/cdk

COPY . ${WORK_DIR}

EXPOSE 4200

CMD ng serve --host 0.0.0.0
