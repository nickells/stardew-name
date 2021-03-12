const startStrings = [
  "B",
  "Br",
  "J",
  "F",
  "S",
  "M",
  "C",
  "Ch",
  "L",
  "P",
  "K",
  "W",
  "G",
  "Z",
  "Tr",
  "T",
  "Gr",
  "Fr",
  "Pr",
  "N",
  "Sn",
  "R",
  "Sh",
  "St"
]
const connectiveStrings = [
  "ll",
  "tch",
  "l",
  "m",
  "n",
  "p",
  "r",
  "s",
  "t",
  "c",
  "rt",
  "ts"
]

const vowelStrings = [
  "a",
  "e",
  "i",
  "o",
  "u"
]

const endStrings = [
  "ie",
  "o",
  "a",
  "ers",
  "ley"
]
const vowelDictionary1 = {
  a: [
    "nie",
    "bell",
    "bo",
    "boo",
    "bella",
    "s"
  ],
  e: [
    "ll",
    "llo",
    "",
    "o"
  ],
  i: [
    "ck",
    "e",
    "bo",
    "ba",
    "lo",
    "la",
    "to",
    "ta",
    "no",
    "na",
    "ni",
    "a",
    "o",
    "zor",
    "que",
    "ca",
    "co",
    "mi"
  ],
  o: [
    "nie",
    "ze",
    "dy",
    "da",
    "o",
    "ver",
    "la",
    "lo",
    "s",
    "ny",
    "mo",
    "ra"
  ],
  u: [
    "rt",
    "mo",
    "",
    "s"
  ]
}

const vowelDictionary2 = {
  a: [
    "nny",
    "sper",
    "trina",
    "bo",
    "-bell",
    "boo",
    "lbert",
    "sko",
    "sh",
    "ck",
    "ishe",
    "rk"
  ],
  e: [
    "lla",
    "llo",
    "rnard",
    "cardo",
    "ffe",
    "ppo",
    "ppa",
    "tch",
    "x"
  ],
  i: [
    "llard",
    "lly",
    "lbo",
    "cky",
    "card",
    "ne",
    "nnie",
    "lbert",
    "nono",
    "nano",
    "nana",
    "ana",
    "nsy",
    "msy",
    "skers",
    "rdo",
    "rda",
    "sh"
  ],
  o: [
    "nie",
    "zzy",
    "do",
    "na",
    "la",
    "la",
    "ver",
    "ng",
    "ngus",
    "ny",
    "-mo",
    "llo",
    "ze",
    "ra",
    "ma",
    "cco",
    "z"
  ],
  u: [
    "ssie",
    "bbie",
    "ffy",
    "bba",
    "rt",
    "s",
    "mby",
    "mbo",
    "mbus",
    "ngus",
    "cky"
  ]
}

const randomNumberBetween = (bottom, top) => {
  const diff = top - bottom
  const rando = Math.floor(Math.random() * (diff))
  return rando + bottom
}

const randomNumberNext = (num) => randomNumberBetween(0, num)

const randoNext = (num1, num2) => {
  if (num2 === undefined) return randomNumberNext(num1)
  else return randomNumberBetween(num1, num2)
}


function namer(){
  let source = ""
  let str1 = ""
  const num = randoNext(3, 6)

  // Get start of string
  source = str1 + startStrings[randoNext(startStrings.length - 1)]

  // Add some chars from array 2 or array 3
  for (let index = 1; index < num - 1; index++) {
    source = index % 2 != 0 ? 
      source + vowelStrings[randoNext(vowelStrings.length)] : 
      source + connectiveStrings[randoNext(connectiveStrings.length)]

    // Stop if greater than the number
    if (source.length >= num) break;
  }

  let char = ''
  let currentLastLetter = source[source.length - 1]

  // if last letter is not a vowel and 50% chance, add some letters
  if (Math.random() < 0.5 && !(vowelStrings.includes(currentLastLetter))) {
    source += endStrings[randoNext(endStrings.length)]
  }

  // otherwise if the last letter is a vowel
  else if (vowelStrings.includes(currentLastLetter)) {
    // if 80 percent chance
    if (Math.random() < 0.8) {
      let newCurrentLastLetter = source[source.length - 1]
      char = newCurrentLastLetter

      // if its short add something from voweldict2
      if (source.length <= 3) {

        const maxValue = vowelDictionary2[char].length - 1
        const index2 = randoNext(maxValue)
        const str3 = vowelDictionary2[newCurrentLastLetter][index2]

        source = source + str3
      }
      // if its long add something from voweldict1
      else {
        const maxValue = vowelDictionary1[char].length - 1
        const index2 = randoNext(maxValue)
        const str3 = vowelDictionary1[newCurrentLastLetter][index2]

        source = source + str3
      }
    }
  }
  // otherwise add a vowel
  else {
    source += vowelStrings[randoNext(vowelStrings.length)]
  }

  // from end of the source, every character
  for (let index = source.length - 1; index > 2; index--) {

    // get the character
    char = source[index];
    
    // if its a vowel
    if (vowelStrings.includes(char)) {

      // get the two to last letter
      char = source[index - 2]
      
      // if its also a vowel
      if (vowelStrings.includes(char)) {
        
        // find the letter in between and add a letter to it

        // so "noco" turns into "nocko" etc

        char = source[index - 1]
        switch (char) {
          case 'c':
            source = source.substring(0, index) + 'k' + source.substring(index);
            --index;
            continue;
          case 'l':
            source = source.substring(0, index) + 'n' + source.substring(index);
            --index;
            continue;
          case 'r':
            source = source.substring(0, index) + 'k' + source.substring(index);
            --index;
            continue;
          default:
            continue;
        }
      }
    }
  }

  // small percent chance of doubling the string if its shourt. a la ka-ka
  if (source.length <= 3 && Math.random() < 0.1) {
    source = Math.random() < 0.5 ? source + source : source + '-' + source;
  }

  // maybe add an m, p, or b, if there's an e at the end
  if (source.length <= 2 && source[source.length - 1] === 'e') {
    source+= Math.random() < 0.3 ? 'm' : ( Math.random() < 0.5 ? 'p' : 'b')
  }

  // blacklist words
  [
    'sex',
    'taboo',
    'fuck',
    'rape',
    'cock',
    'willy',
    'cum',
    'goock',
    'trann',
    'gook',
    'bitch',
    'shit',
    'pusie',
    'kike',
    'nigg',
    'puss'
  ].forEach(expletive => {
    if (source.includes(expletive)) {
      source = Math.random() > 0.5 ? 'Bobo' : 'Wumbus'
    }
  })

  return source
}