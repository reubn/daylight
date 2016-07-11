const colours = {
  cycling: '#00cdec',
  golfing: '#44c42d',
  kayaking: '#1390d4',
  paddling: '#1390d4',
  paintball: '#e82c64',
  riding: '#995e34',
  rollerblading: '#e0bb00',
  rollerskating: '#ffa361',
  rowing: '#1390d4',
  running: '#f660f4',
  skateboarding: '#ff8c3b',
  skating: '#1390d4',
  skiing: '#00a6ff',
  snowboarding: '#8765f7',
  snowshoeing: '#3360f2',
  walking: '#20ef5a',
  wheel_chair: '#358f8c',
  airplane: '#8ced60',
  boat: '#00c5ff',
  bus: '#ffee1d',
  car: '#e6413d',
  escalator: '#1dffee',
  ferry: '#00c5ff',
  funicular: '#1dffee',
  motorcycle: '#ed7f60',
  sailing: '#8ced60',
  scooter: '#00cdec',
  train: '#9bff1d',
  tram: '#9bff1d',
  underground: '#9bff1d'
}

const map = {
  transport: 'car',
  downhill_skiing: 'skiing',
  cross_country_skiing: 'skiing',
  roller_skiing: 'skiing'
}

module.exports = (move, name=map[move]||move) => ({name, colour: colours[name]})
