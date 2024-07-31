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
> Beginning of additions (that work)
### Getting started

Clone the repository
```sh
git clone https://github.com/Gamify-IT/memory.git
```

Install the dependencies
```sh
npm install
```

### Compile and Hot-Reload for Development
To run the project locally with your IDE feature and have all necessary dependencies running,
start the dependencies via docker:
```sh
docker compose -f docker-compose-dev.yaml up
```
Then start the frontend with:
```sh
npm run serve
```
You can now access the game at [localhost](http://localhost).

### Build your local changes as a docker container
To build and run your local changes as a docker container use:
```sh
docker compose up --build
```
You can remove the container with:

```sh
docker compose down
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

> End of additions
