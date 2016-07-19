const {cycling, walking, running, golfing, swimming, waterCraft, horse, rollerAndSkating, skateboarding, skiing, wheelChair, paintballing, flying, bus, car, accending, motorcycling, scooter, train} = require('./colours')

const colours = {
  cycling,
  golfing,

  kayaking: waterCraft,
  rowing: waterCraft,
  boat: waterCraft,
  sailing: waterCraft,

  paddling: swimming,
  paintball: paintballing,
  riding: horse,

  rollerblading: rollerAndSkating,
  rollerskating: rollerAndSkating,
  skating: rollerAndSkating,

  running,

  skateboarding,
  snowboarding: skateboarding,

  skiing,
  downhill_skiing: skiing,
  cross_country_skiing: skiing,
  roller_skiing: skiing,
  snowshoeing: skiing,

  walking,
  wheel_chair: wheelChair,
  airplane: flying,
  bus,
  car,

  escalator: accending,
  funicular: accending,

  motorcycle: motorcycling,
  scooter,

  train,
  tram: train,
  underground: train
}

const rewrites = {
  transport: 'car'
}

module.exports = (move, name=rewrites[move]||move) => ({name, colour: colours[name]})
