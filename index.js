const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'calorie-tracker-be';

app.get('/', (request, response) => {
  response.send('Welcome to Calorie Tracker');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});


app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select()
    .then(foods => {
      if (foods.length) {
        response.status(200).json(foods[0]);
      } else {
        response.status(404).json({
          error: `Could not find food with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/foods', (request, response) => {
  const food = request.body;

  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, calories: <int> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('foods').insert(food, 'id')
    .then(food => {
      response.status(201).json({ "food": request.body })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/foods/:id', (request, response) => {
  const food = request.body;

  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, calories: <Int> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('foods').where('id', request.params.id).update(food)
    .then(foods => {
      if (foods == 1) {
        response.status(201).json({"food": food });
      }
    })
    .catch((error) => {
      response.status(400).json({ error });
    });
});

app.delete('/api/v1/foods/:id', (request, response) => {
  return database('mealfoods').where('food_id', request.params.id).del()
  .then(() => database('foods').where('id', request.params.id).del())
    .then(foods => {
        response.status(204);
    })
    .catch(error => {
      response.status(404);
    });
});


//meal endpoints

app.get('/api/v1/meals', (request, response) => {
  database.raw(`
    SELECT meals.id, meals.name, array_to_json
    (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
    AS foods
    FROM meals
    JOIN meal_foods ON meals.id = meal_foods.meal_id
    JOIN foods ON meal_foods.food_id = foods.id
    GROUP BY meals.id`)

    .then((meals) => {
      response.status(200).json(meals.rows)
    })
    .catch((error) => {
      response.status(404).json({ error })
  })
});

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  database('meal_foods').where('meal_id', request.params.meal_id)
  .join('foods', 'meal_foods.food_id', '=', 'foods.id')
  .join('meals', 'meal_foods.meal_id', '=', 'meals.id')
  .select('foods.id AS id', 'foods.name AS name', 'calories', 'meals.name AS meal_name')
  .then(foods => {
    let meal_foods = [];

    let meal_name = foods[0].meal_name;
    foods.forEach( (f) => {
      meal_foods.push(f)
    });

    response.status(200).json({
      'id': request.params.meal_id,
      'meal': meal_name,
      'foods': meal_foods
    })
  })
  .catch((error) => {
    response.status(404).json({ error });
  });
});

app.post('/api/v1/meals/:meal_id/foods/:food_id', (request, response) => {
  database('meal_foods').insert({'food_id': request.params.food_id, 'meal_id': request.params.meal_id})
    .then(new_mealfood => {
      response.status(201).json({ "message": "Successfully added food to meal"})
    })
    .catch(error => {
      response.status(400).json({ error });
    });
});

app.delete('/api/v1/meals/:meal_id/foods/:food_id', (request, response) => {
  database('meal_foods').where('food_id', request.params.food_id).del()
  .then(foods => {
    if (foods == 1) {
      response.status(204).json({success: true});
    } else {
      response.status(404).json({ error });
    }
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});




module.exports = app
