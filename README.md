# Memory

This is a traditional memory game where you have to find matching all pairs.

This repository contains the frontend for the [Memory minigame](https://gamifyit-docs.readthedocs.io/en/latest/user-manuals/minigames/memory.html).

## Development

### Getting started

Clone the repository  
```sh
git clone https://github.com/Gamify-IT/memory.git
```

Install the dependencies  
```sh
npm install
```

#### Run with Docker-compose

Start all dependencies with our docker-compose files.
Check the [manual for docker-compose](https://github.com/Gamify-IT/docs/blob/main/dev-manuals/languages/docker/docker-compose.md).

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Test

Run the tests:
```sh
npm run test:unit
```

To also get the test coverage:
```sh
npm run test:unit -- --coverage
```

### Build

Build the Docker-Container
```sh
docker build -t memory-dev .
```
And run it at port 8000 with
```sh
docker run -d -p 8000:80 --name memory-dev memory-dev
```

To monitor, stop and remove the container you can use the following commands:
```sh
docker ps -a -f name=memory-dev
```
```sh
docker stop memory-dev
```
```sh
docker rm memory-dev
```

## User manual

Run the docker container with the following command at port 8000:
```sh
docker run -d -p 8000:80 --name memory ghcr.io/gamify-it/memory:latest
```
Now you can access it at [http://localhost:8000](http://localhost:8000).  
To access it externally replace localhost with your IP.  

To monitor the container you can use the following command:
```sh
docker ps -a -f name=memory
```
To stop the container you can use the following command:
```sh
docker stop memory
```
To remove the container you can use the following command:
```sh
docker rm memory
```
