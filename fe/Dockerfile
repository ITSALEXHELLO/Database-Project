# Stage 1: Build the React app
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY app/package.json app/package-lock.json ./
RUN npm install

# Copy the source code and build the app
COPY app/ .
RUN npm run build

# Stage 2: Serve the app with a lightweight web server
FROM nginx:stable-alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the container port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
