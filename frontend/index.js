const BASE_URL = "http://localhost:3000"
const PLATFORMS_URL = `${BASE_URL}/platforms`
const AD_DIMENSIONS_URL = `${BASE_URL}/ad_dimensions`
const body = document.querySelector('body')

document.addEventListener('DOMContentLoaded', () => loadPlatforms())

const loadPlatforms = () => {
  fetch(PLATFORMS_URL)
  .then(resp => resp.json())
  .then(json => {
    json.forEach(platform => renderPlatform(platform))
  })
}

const renderPlatform = (platform) => {
  
}