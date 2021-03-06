# Getting Started

## Prerequisites

#### On *Windows* download and install:

 - NodeJS - https://nodejs.org/en/
 - Haxe - http://haxe.org
 - Flash Player Debugger - https://www.adobe.com/support/flashplayer/debug_downloads.html

#### On *MacOS* (using homebrew):

```sh
$ brew install npm haxe cask
```

```sh
$ brew cask install flash-player-debugger
```

## Preparing the project

#### 1. Install gulp-cli globally

```sh
$ npm install --global gulp-cli
```

#### 2. Run npm install

> This will install all node dependencies of the project. The Dependencies are found in the `package.json`

```sh
$ npm install
```

#### 3. Install haxelib dependencies

> Create a new project repository

```sh
$ haxelib newrepo
```

> This will install all haxe dependencies of the project. The Dependencies are found in the `.hxml` files

```sh
$ haxelib install all --always
```

# Using gulp

#### Cleaning the build files

> Build files are located in the `dist` folder

```sh
$ gulp clean
```

#### Building the project for production

> This will build both flash and js target

```sh
$ gulp --production
```

> You can use the `--production` flag for any of the tasks

#### Using for development

> For development, you can use gulp to serve a local page with _livereload_ and automatic source change watcher.

For JS
```sh
$ gulp serve-js
```

For flash
```sh
$ gulp serve-flash
```

#### Other

To list all gulp tasks, use
```sh
$ gulp -T
```
