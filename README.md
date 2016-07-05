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
