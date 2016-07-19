const {cycling, walking, swimming, running, climbing, fighting, surfing, dancing, bowling, volleyball, relaxing, batSports, weightlifting, racketSports, gymTraining, stickSports, rugby, frisbee, basketball, gymnastics, miscBallSports, cleaning, football, horse} = require('./colours')

const colours = {
  gymnastics,
  aerobics: gymnastics,
  pilates: gymnastics,

  rugby,
  american_football: rugby,

  badminton: racketSports,
  racquetball: racketSports,
  squash: racketSports,
  table_tennis: racketSports,
  tennis: racketSports,

  dancing,
  ballet: dancing,
  zumba: dancing,

  bandy: stickSports,
  hockey: stickSports,
  lacrosse: stickSports,

  polo: horse,

  baseball: batSports,
  cricket: batSports,

  basketball,

  volleyball,
  beach_volleyball: volleyball,

  bodypump: weightlifting,
  kettlebell: weightlifting,
  weight_training: weightlifting,

  bowling,
  curling: bowling,
  petanque: bowling,

  boxing: fighting,
  martial_arts: fighting,
  wrestling: fighting,
  fencing: fighting,

  circuit_training: gymTraining,
  elliptical_training: gymTraining,
  gym_training: gymTraining,

  cleaning,

  climbing,
  parkour: climbing,
  stair_climbing: climbing,

  disc_ultimate: frisbee,

  floorball: miscBallSports,
  handball: miscBallSports,

  indoor_cycling: cycling,
  spinning: cycling,

  surfing,
  kite_surfing: surfing,
  windsurfing: surfing,

  running_on_treadmill: running,

  swimming,
  scuba_diving: swimming,
  water_polo: swimming,

  soccer: football,

  stretching: relaxing,
  yoga: relaxing,

  walking_on_treadmill: walking
}

module.exports = () => colours
