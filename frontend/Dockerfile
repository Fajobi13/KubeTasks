# backend/Dockerfile

FROM python:3.9-slim

# Create a non-root user
RUN useradd -ms /bin/bash flaskuser

# Set the working directory
WORKDIR /app

# Copy the backend code
COPY . /app

# Install dependencies
RUN pip install flask flask-cors

# Change ownership of the working directory
RUN chown -R flaskuser:flaskuser /app

# Switch to the non-root user
USER flaskuser

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]
