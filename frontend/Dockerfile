FROM node:18-alpine


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
