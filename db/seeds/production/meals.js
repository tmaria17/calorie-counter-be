exports.seed = function(knex, Promise) {

  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([

        knex('meals').insert([{name: 'Breakfast'},
                              {name: 'Lunch'},
                              {name: 'Dinner'}
                              ], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
