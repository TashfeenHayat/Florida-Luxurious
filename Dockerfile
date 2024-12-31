# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Install serve globally to serve the built app
RUN npm install -g serve

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to start the server
CMD ["serve", "-s", "build", "-l", "5000"]
