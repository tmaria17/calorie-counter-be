exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex('meal_foods').insert([
          { meal_id: 1, food_id: 1 },
          { meal_id: 2, food_id: 2 },
          { meal_id: 3, food_id: 3 },
          { meal_id: 1, food_id: 4 }
        ])
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
