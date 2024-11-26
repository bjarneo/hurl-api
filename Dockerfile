# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies

# If you're building for production
RUN npm ci --omit=dev

# Bundle app source
COPY server.js .

# Expose port 3000
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "server.js" ]
