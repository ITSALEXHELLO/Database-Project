# Use the Miniconda base image that comes with conda pre-installed
FROM continuumio/miniconda3

# Set the working directory inside the container
WORKDIR /app

# Copy the environment.yaml file from your local machine to the container
COPY app/environment.yaml /app/environment.yaml

# Copy the app code from your local machine to the container
COPY app/ /app/

# Install wait-for-it (used to wait for MySQL to be ready before starting the app)
RUN apt-get update && apt-get install -y curl \
    && curl -sSLo /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it

# Create the conda environment from the environment.yaml file
RUN conda env create -f /app/environment.yaml

# Activate the environment and set the path
ENV PATH /opt/conda/envs/480Proj/bin:$PATH

# Expose the port that Flask will use
EXPOSE 5001
EXPOSE 3307

# Run the application
CMD ["bash", "-c", "wait-for-it mysql:3306 -- python database_construction.py && exec python app.py"]
