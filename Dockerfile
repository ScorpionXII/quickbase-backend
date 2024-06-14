FROM node:22-alpine3.19

# Set Working Directory
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install packages
RUN npm install

# Copy the remaining files from the app root directory
COPY . .

# Expose the app port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
