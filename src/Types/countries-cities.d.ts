declare module "countries-cities" {
  export function getCountries(): string[];
  export function getCities(country: string): string[];
}
