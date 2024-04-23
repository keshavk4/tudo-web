FROM node:20

WORKDIR /src/app

COPY . .

RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]