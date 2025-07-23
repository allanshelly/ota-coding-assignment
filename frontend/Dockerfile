FROM node:20.19.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose Vite dev port
EXPOSE 5173

CMD ["npm", "run", "dev"]
