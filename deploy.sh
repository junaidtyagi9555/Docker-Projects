# Clone or create project directory
mkdir docker-portfolio
cd docker-portfolio

# Copy all files to their respective locations
# Build the Docker image
docker build -t portfolio-app .

# Run the container
docker run -d -p 8080:80 --name my-portfolio portfolio-app

# Or use docker-compose
docker-compose up -d