FROM node:alpine
RUN npm install pm2 -g

WORKDIR /app

# Copy the package.json to workdir
COPY package.json ./


# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .

# Start the application

EXPOSE 5000

#Default command
CMD ["pm2-runtime", "server.js"]