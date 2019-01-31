exports.seed = function(knex, Promise) {

    return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([

        knex('meal_foods').insert([{food_id: 1, meal_id: 1},
                              {food_id: 2, meal_id: 2},
                              {food_id: 3, meal_id: 3}
                              ], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
