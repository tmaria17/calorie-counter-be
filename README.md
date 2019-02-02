# calorie-counter-be
[![Waffle.io - Columns and their card count](https://badge.waffle.io/tmaria17/calorie-counter-be.svg?columns=all)](https://waffle.io/tmaria17/calorie-counter-be)
[![Build Status](https://travis-ci.org/tmaria17/calorie-counter-be.svg?branch=master)](https://travis-ci.org/tmaria17/calorie-counter-be)

## Introduction
 This project is an express API. This API has food and meal endpoints, and will be consumed by a seprate frontend to create a calorie tracker app. 
 
See it deployed here: https://enigmatic-beach-47018.herokuapp.com/ <br>
Checkout the frontend here: https://github.com/mnhollandplum/calorie-tracker-fe
## How to Use

1. Clone this starter kit repository and rename the repository to anything you'd like in one command:

  ```shell
  git clone git@github.com:tmaria17/calorie-counter-be.git
  ```
  Visit: http://localhost:3000/ to run the application
  
  ## Endpoints 
  
  * GET /api/v1/foods
  
  * GET /api/v1/foods/:id
  
  * POST /api/v1/foods

  * PATCH /api/v1/foods/:id
  
  * DELETE /api/v1/foods/:id
  
  * GET /api/v1/meals
  
  * GET /api/v1/meals/:meal_id/foods
  
  * POST /api/v1/meals/:meal_id/foods/:id

  * DELETE /api/v1/meals/:meal_id/foods/:id
  
 ## Schema Design

 ![screenshot of schema](https://raw.githubusercontent.com/tmaria17/calorie-counter-be/master/schema.png)

## Known Issues

## How to Contribute 
To contribute to this project please fork and submit a pull request

## Core Contributers 
[Maria Torres](https://github.com/tmaria17)

[Nikki Holland-Plum](https://github.com/mnhollandplum)


## Built With

* [JavaScript](https://www.javascript.com/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)

