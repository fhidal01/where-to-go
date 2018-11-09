# Where To Go (Desicions made simple)
You can find project full documentation [here](https://github.com/fhidal01/where-to-go/wiki)

## Prerequisites
* Node version: 8.12.0
* NPM version: 6.4.1
* Angular CLI: 7.0.3
* Firebase tools CLI: 6.0.0

## Install
After cloning project and ensuring all prerequisites are met navigate to the root directory of the project and run npm install

````js
  cd projects/where_to_go
  npm install
````
**Note**: If you run into any errors at this point you may need to run npm with sudo
````js
  sudo npm install
````

## Build (local development)

**UI**  
At root level of project Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

````js
  ng build
````
**OR**
````js
  ng build --prod
````

**GCP Cloud Functions**  
Navigate to the `functions` directory and run `npm run build` to build the cloud functions. The build artifacts will be stored in the `functions/lib` directory.
````js
  cd ./functions
  npm run build
````

## Server (local development)

**UI**  
At root level of project Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
````js
  ng serve
````

**GCP Cloud Functions**  
Navigate to the `functions` directory and run `npm run build` to build the cloud functions. The build artifacts will be stored in the `functions/lib` directory.
````js
  cd ./functions
  npm run build
  firebase serve --only functions
````
**Note**: If you run into any errors at this point you may need to run with sudo
````js
  sudo firebase serve --only functions
````

# ------------- Ignore instructions below for now -------------

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
