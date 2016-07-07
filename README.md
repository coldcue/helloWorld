# Getting Started

#### 1. Prerequisites

On *Windows* download and install:

 - NodeJS - https://nodejs.org/en/
 - Haxe - http://haxe.org

On *MacOS* (using homebrew):

```sh
$ brew install npm haxe
```

#### 2. Install gulp-cli globally

```sh
$ npm install --global gulp-cli
```

#### 3. Run npm install

> This will install all node dependencies of the project. The Dependencies are found in the `package.json`

```sh
$ npm install
```

#### 4. Install haxelib dependencies

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

#### Building the project

> This will build both flash and js target

```sh
$ gulp
```

#### Using for development

> For development, you can use gulp to serve a local page with livereload and automatic source change watcher.

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
