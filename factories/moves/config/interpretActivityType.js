const transforms = {
  gymnastics: 'gymnastics',
  aerobics: 'gymnastics',
  pilates: 'gymnastics',

  rugby: 'rugby',
  american_football: 'rugby',

  badminton: 'racketSports',
  racquetball: 'racketSports',
  squash: 'racketSports',
  table_tennis: 'racketSports',
  tennis: 'racketSports',

  dancing: 'dancing',
  ballet: 'dancing',
  zumba: 'dancing',

  bandy: 'stickSports',
  hockey: 'stickSports',
  lacrosse: 'stickSports',

  polo: 'horse',

  baseball: 'batSports',
  cricket: 'batSports',

  basketball: 'basketball',

  volleyball: 'volleyball',
  beach_volleyball: 'volleyball',

  bodypump: 'weightlifting',
  kettlebell: 'weightlifting',
  weight_training: 'weightlifting',

  bowling: 'bowling',
  curling: 'bowling',
  petanque: 'bowling',

  boxing: 'fighting',
  martial_arts: 'fighting',
  wrestling: 'fighting',
  fencing: 'fighting',

  circuit_training: 'gymTraining',
  elliptical_training: 'gymTraining',
  gym_training: 'gymTraining',

  cleaning: 'cleaning',

  climbing: 'climbing',
  parkour: 'climbing',
  stair_climbing: 'climbing',

  disc_ultimate: 'frisbee',

  floorball: 'miscBallSports',
  handball: 'miscBallSports',

  indoor_cycling: 'cycling',
  spinning: 'cycling',

  surfing: 'surfing',
  kite_surfing: 'surfing',
  windsurfing: 'surfing',

  running_on_treadmill: 'running',

  swimming: 'swimming',
  scuba_diving: 'swimming',
  water_polo: 'swimming',

  soccer: 'football',

  stretching: 'relaxing',
  yoga: 'relaxing',

  walking_on_treadmill: 'walking'
}

module.exports = activityType => transforms[activityType] || 'Unclassified'
