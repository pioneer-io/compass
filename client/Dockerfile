FROM node:15.1.0

LABEL version="1.1"
LABEL description="Docker base image for frontend of compass application"

WORKDIR /app 

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
