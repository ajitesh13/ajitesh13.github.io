import { getHomeContent } from './home'

const BASE_URL = 'https://ajitesh13.github.io'

export function getPersonSchema() {
  const home = getHomeContent()

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: home.name,
    jobTitle: home.tagline,
    url: BASE_URL,
    sameAs: [home.social.github, home.social.twitter, home.social.instagram]
  }
}
