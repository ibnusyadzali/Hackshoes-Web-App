# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install the app dependencies
RUN npm install
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x wait-for-it.sh

# Expose a port to access the web app (replace 3000 with the appropriate port if needed)
EXPOSE 3000
ENTRYPOINT ["/bin/bash"]
