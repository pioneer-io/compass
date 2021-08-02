FROM node:15.1.0

LABEL version="1.1"
LABEL description="Docker base image for backend of compass application"

WORKDIR /app 

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start-watch"]
