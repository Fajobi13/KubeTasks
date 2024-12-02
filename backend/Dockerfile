# Use the official Python image
FROM python:3.9-slim

# Create a non-root user
RUN useradd -ms /bin/bash flaskuser

# Set the working directory in the container
WORKDIR /app

# Copy the backend code into the container
COPY . /app

# Install dependencies
RUN pip install flask

# Change ownership of the working directory to the non-root user
RUN chown -R flaskuser:flaskuser /app

# Switch to the non-root user
USER flaskuser

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]
