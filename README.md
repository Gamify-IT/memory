# Memory

This is a traditional memory game where you have to find matching all pairs.

![game screenshot](https://raw.githubusercontent.com/Gamify-IT/docs/main/user-manuals/minigames/assets/memory-game-screen.webp)
This repository contains the frontend for the [Memory minigame](https://gamifyit-docs.readthedocs.io/en/latest/user-manuals/minigames/memory.html).

# Table of contents

<!-- TOC -->

- [Links](#links)
- [Development](#development)
  - [Getting started](#getting-started)
    - [Run with Docker-compose](#run-with-docker-compose)
  - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
  - [Test](#test)
  - [Build](#build)
  - [User manual](#user-manual)
  <!-- TOC -->

## Links

- User documentation for the minigame can be found [here](https://gamifyit-docs.readthedocs.io/en/latest/user-manuals/minigames/memory.html)
- For the backend, see the [Gamify-IT/memory-backend repository](https://github.com/Gamify-IT/memory-backend)
- The installation manual and setup instructions can be found [here](https://gamifyit-docs.readthedocs.io/en/latest/install-manuals/index.html).

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

## Audio source 

1.	Background sound
https://zvukipro.com/music/651-fonovaja-muzyka-dlja-igr-i-drugih-situacij-zacikleno.html

2.	Click
https://pixabay.com/de/sound-effects/interface-button-154180/

3.	Success notification
https://pixabay.com/de/sound-effects/bonus-143026/

4.	Swipe 
https://pixabay.com/de/sound-effects/swing-whoosh-5-198498/

5. Wrong answer notification
https://pixabay.com/de/sound-effects/error-126627/