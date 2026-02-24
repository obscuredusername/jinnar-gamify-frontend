FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port and start
EXPOSE 6190
CMD ["npm", "run", "preview", "--", "--host", "--port", "6190"]
