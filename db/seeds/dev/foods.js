exports.seed = function(knex, Promise) {

  return knex('foods').del() // delete all footnotes first
    .then(() => {
      return Promise.all([

        knex('foods').insert([{name: 'Burger', calories: 365},
                              {name: 'Yogurt', calories: 100},
                              {name: 'Asparagus', calories: 75}
                              ], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
