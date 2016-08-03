const transforms = {
  cycling: 'cycling',
  golfing: 'golfing',

  kayaking: 'waterCraft',
  rowing: 'waterCraft',
  boat: 'waterCraft',
  sailing: 'waterCraft',

  paddling: 'swimming',
  paintball: 'paintballing',
  riding: 'horse',

  rollerblading: 'rollerAndSkating',
  rollerskating: 'rollerAndSkating',
  skating: 'rollerAndSkating',

  running: 'running',

  skateboarding: 'skateboarding',
  snowboarding: 'skateboarding',

  skiing: 'skiing',
  downhill_skiing: 'skiing',
  cross_country_skiing: 'skiing',
  roller_skiing: 'skiing',
  snowshoeing: 'skiing',

  walking: 'walking',
  wheel_chair: 'wheelChair',
  airplane: 'flying',
  bus: 'bus',

  car: 'car',
  transport: 'car',

  escalator: 'accending',
  funicular: 'accending',

  motorcycle: 'motorcycling',
  scooter: 'scooter',

  train: 'train',
  tram: 'train',
  underground: 'train'
}

module.exports = moveType => transforms[moveType] || 'Unclassified'
