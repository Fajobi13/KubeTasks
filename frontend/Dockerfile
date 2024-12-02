FROM nginx:alpine

# Add a non-root user and group
RUN addgroup -S frontendgroup && adduser -S frontenduser -G frontendgroup

# Create necessary directories and set ownership for the non-root user
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R frontenduser:frontendgroup /var/cache/nginx

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static HTML files to Nginx's default directory
COPY . /usr/share/nginx/html

# Set ownership of the HTML files for the non-root user
RUN chown -R frontenduser:frontendgroup /usr/share/nginx/html

# Switch to the non-root user
USER frontenduser

# Expose the default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
