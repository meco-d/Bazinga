# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the built Angular files to the Nginx HTML directory
COPY ./frontend/dist/learning-enhancement/browser/ /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]