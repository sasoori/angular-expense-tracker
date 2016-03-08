# AngularJS Expanse Tracker

### About

An expense tracker that helps you and your friends track each other’s debts.

### Prerequisites

* NodeJS (npm)
* Grunt
* Bower
* Yeoman
* cg-angular-generator

## Installation

```$ npm install -g grunt-cli yo bower```

```$ npm install -g generator-cg-angular```

```$ npm install```

```$ bower install```

## Development

For testing first run command:

```$ grunt serve```

To create a new **partial** or state run:

```$ yo cg-angular:partial {partial-name}```

To create a new **service** run:

```$ yo cg-angular:service {service-name}```

To create a new **directive** run:

```$ yo cg-angular:directive {directive-name}```


## Building

To build the project for distribution run:

```$ grunt build```

This will generate the final minified app in the */dist* folder

