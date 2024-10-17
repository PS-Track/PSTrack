export interface CountryCodeI {
  value: string
  label: string
}

export interface CountryI {
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  idd: {
    root: string
    suffixes: string[]
  }
  capital: string[]
  altSpellings: string[]
  region: string
  languages: {
    [key: string]: string
  }
  translations: {
    [key: string]: {
      official: string
      common: string
    }
  }
  latlng: number[]
  landlocked: boolean
  area: number
  demonyms: {
    eng: {
      f: string
      m: string
    }
  }
  flag: string
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
  population: number
  car: {
    signs: string[]
    side: string
  }
  timezones: string[]
  continents: string[]
  flags: {
    png: string
    svg: string
  }
  coatOfArms: {
    png: string
    svg: string
  }
  startOfWeek: string
  capitalInfo: {
    latlng: number[]
  }
}