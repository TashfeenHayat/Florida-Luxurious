# Stage 1: Build the app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app using Vite
RUN npm run build

# Stage 2: Serve the app using Node.js with npx
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the build artifacts from the previous build stage
COPY --from=build /usr/src/app/dist /usr/src/app/dist

# Install `serve` package globally
RUN npm install -g serve

# Expose port 5000 (default for serve)
EXPOSE 5000

# Use npx serve to serve the production build
CMD ["serve", "dist", "-l", "5000"]
