# Use an official Python runtime as a parent image
FROM python:3.12-slim-buster

# Set the working directory in the container to /app
WORKDIR /spo_proj

# Add the current directory contents into the container at /app
ADD . /spo_proj

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Run app.py when the container launches
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
