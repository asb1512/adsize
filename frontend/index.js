const BASE_URL = "http://localhost:3000"
const PLATFORMS_URL = `${BASE_URL}/platforms`
const AD_DIMENSIONS_URL = `${BASE_URL}/ad_dimensions`
const body = document.querySelector('body')
const navBar = document.getElementsByClassName('nav-bar')[0]
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => onPageLoad())

function onPageLoad() {

  // allows elements to fade in after a specified period of time
  const fadeInXSec = async (parent, child, milliseconds) => {
    await new Promise(r => setTimeout(r, milliseconds));
    parent.appendChild(child)
  }


  // adds logo to page
  const adSizeLogo = document.createElement('img')
  adSizeLogo.setAttribute('id', 'ad-size-logo')
  adSizeLogo.setAttribute('class', 'fade-in')
  adSizeLogo.setAttribute('src', 'images/AdSize-Logo.png')
  navBar.appendChild(adSizeLogo)


  // adds 2 containers within main tag
  const container1 = document.createElement('div')
  container1.setAttribute('id', 'select-your-platform-div-1')
  const container2 = document.createElement('div')
  container2.setAttribute('id', 'select-your-platform-div-2')
  container2.setAttribute('class', 'center')
  main.appendChild(container1)
  main.appendChild(container2)


  // adds 'Select your platform' prompt
  const selectPlatformPrompt = document.createElement('p')
  selectPlatformPrompt.setAttribute('id', 'select-platform-prompt')
  selectPlatformPrompt.setAttribute('class', 'heading fade-in')
  selectPlatformPrompt.innerHTML = 'Select your platform:'
  fadeInXSec(container1, selectPlatformPrompt, 1000)


  // adds 'Select' button
  const selectButton = document.createElement('button')
  selectButton.setAttribute('class', 'button fade-in')
  selectButton.innerHTML = 'Select'
  fadeInXSec(container2, selectButton, 2000)

  selectButton.addEventListener("mouseover", (event) => {
    event.target.style.backgroundColor = "#52796f"
    event.target.style.color = "#2f3e46"
  }, false)

  selectButton.addEventListener("mouseout",(event) => {
    event.target.style.backgroundColor = "#cad2c5"
    event.target.style.color = "#52796f"
  }, false)

  const buttonClick = (event) => {
    event.target.setAttribute('class', 'button fade-out')
  }
  selectButton.addEventListener("click", buttonClick)


  const loadPlatforms = () => {
    fetch(PLATFORMS_URL)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(platform => renderPlatform(platform))
    })
  }

  const renderPlatform = (platform) => {
    const div = document.createElement('div')

  }
}