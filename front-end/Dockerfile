# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:12.14-alpine AS build

WORKDIR /app

# Copy the package.json to workdir
COPY package.json ./

# Install all the dependencies
RUN npm install

# Copy application source
COPY . .

# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/spam-system /usr/share/nginx/html

# Expose port 80
EXPOSE 80