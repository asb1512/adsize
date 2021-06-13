const BASE_URL = "http://localhost:3000"
const PLATFORMS_URL = `${BASE_URL}/platforms`
const USERS_URL = `${BASE_URL}/users`
const body = document.querySelector('body')
const navBar = document.getElementsByClassName('nav-bar')[0]
const notesSideBar = document.getElementsByClassName('sidenav')[0]
const main = document.querySelector('main')
const notesSignInMessage = document.getElementById('notes-signin-message')

const jsonResp = []
const currentUser = {}

const isEven = int => {
  return (int % 2 === 0)
}

function openNav() {
  document.getElementById("mySidenav").style.width = "400px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => onPageLoad())

function onPageLoad() {

  // takes a callback function and waits a specified amount of time to execute said function
  const sleep = async (cbFunc, domElement, milliseconds) => {
    await new Promise(r => setTimeout(r, milliseconds))
    cbFunc(domElement, milliseconds)
  }

  // allows elements to fade in after a specified period of time
  const fadeInXSec = async (parent, child, milliseconds) => {
    await new Promise(r => setTimeout(r, milliseconds));
    parent.appendChild(child)
  }

  const removeFromDom = (domElement, milliseconds) => {
    domElement.remove()
  }


  // adds logo to page
  const adSizeLogo = document.createElement('img')
  adSizeLogo.setAttribute('id', 'ad-size-logo')
  adSizeLogo.setAttribute('class', 'fade-in')
  adSizeLogo.setAttribute('src', 'images/AdSize-Logo.png')
  navBar.appendChild(adSizeLogo)


  // adds email label form and 'enter' button
  const emailForm = document.createElement('form')
  emailForm.setAttribute('class', 'email-form')
  const emailLabel = document.createElement('label')
  emailLabel.setAttribute('for', 'email-input')
  const emailInput = document.createElement('input')
  emailInput.setAttribute('id', 'email-input')
  emailInput.setAttribute('placeholder', 'Enter your email')
  emailInput.setAttribute('style', 'margin: 1em;')
  const emailSubmitButton = document.createElement('button')
  emailSubmitButton.setAttribute('id', 'email-form-button')
  emailSubmitButton.setAttribute('class', 'platform-item')
  emailSubmitButton.innerHTML = 'Submit'


  // adds event listener and prevents default form submission
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputText = document.getElementById('email-input')
    regexEmail(inputText.value)
  })


  // appending email entry form
  navBar.appendChild(emailForm)
  emailForm.appendChild(emailLabel)
  emailForm.appendChild(emailInput)
  emailForm.appendChild(emailSubmitButton)

  // handles email verification
  const verifyEmail = (email) => {
    
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({email: email})
    }

    fetch(USERS_URL, configObj)
    .then(resp => resp.json())
    .then(json => {
      currentUser["id"] = json.id
      currentUser["email"] = json.email
      currentUser["list"] = json.list
      currentUser["list"]["list_items"] = json.list.list_items
      displayUserList()
      console.log(json)
    })
    .catch(error => {
      console.log(error)
    })
  }

  // runs Regex to verify that email isn't an empty string and that it containes essential characters i.e. '@' '.'
  const regexEmail = (email) => {
    const regex = new RegExp(/[@.]+/g)
    if (regex.test(email)) {
      verifyEmail(email)
    } else {
      alert('Please enter a valid email address.')
    }
  }

  // displays all user's list items
  const displayUserList = () => {
    emailForm.remove()
    notesSignInMessage.remove()
    openNav()
    
    currentUser.list.list_items.forEach(item => {
      const notesAn = document.createElement('a')
      notesAn.setAttribute('id', `${item.id}`)
      notesAn.setAttribute('href', '#')
      notesAn.innerHTML = item.message
      notesSideBar.appendChild(notesAn)
      // adds event listener to each list item anchor that is appended
      notesAn.addEventListener("click", event => {
        event.target.setAttribute('style', 'text-decoration: line-through;')
        deleteListItem(event.target.id)
      })
    })

    // sends DELETE request to delete user's selected list item
    const deleteListItem = id => {
      const deleteListItemUrl = `${USERS_URL}/${currentUser.id}/lists/${currentUser.list.id}/list_items/${id}`

      const configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: ""
      }
      
      fetch(deleteListItemUrl, configObj)
    }

    // creates 'Add new note' button
    const newNoteAn = document.createElement('a')
    newNoteAn.setAttribute('href', '#')
    newNoteAn.setAttribute('id', 'create-new-note')
    newNoteAn.innerHTML = '&#43; Add new note'
    notesSideBar.appendChild(newNoteAn)

    // listens for click on 'Add new note' anchor
    newNoteAn.addEventListener("click", event => {
      const newNoteDiv = document.createElement('div')
      newNoteDiv.setAttribute('id', 'new-note-div')

      // creates a text input for new list item
      const newNoteInput = document.createElement('input')
      newNoteInput.setAttribute('id', 'new-note-input')
      newNoteInput.setAttribute('type', 'text')
      newNoteInput.setAttribute('placeholder', 'Enter your note')

      // adds text input and parent div to DOM
      newNoteDiv.appendChild(newNoteInput)
      notesSideBar.insertBefore(newNoteDiv, newNoteAn)

      // if user presses enter key, calls addNewUserNote()
      newNoteInput.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
          event.preventDefault()
          addNewUserNote(event.target.value)
        }
      })
    })
  }

  // adds new user list item to user's list and POSTs to API
  const addNewUserNote = message => {
    const newNoteAn = document.getElementById('create-new-note')
    const newNoteDiv = document.getElementById('new-note-div')
    newNoteDiv.remove()

    const notesAn = document.createElement('a')
    // notesAn.setAttribute('id', `${item.id}`)
    notesAn.setAttribute('href', '#')
    notesAn.innerHTML = message
    notesSideBar.insertBefore(notesAn, newNoteAn)

    const listItemsUrl = `${USERS_URL}/${currentUser.id}/lists/${currentUser.list.id}/list_items`

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({message: message})
    }

    fetch(listItemsUrl, configObj)
    .then(resp => resp.json())
    .then(json => {
      notesAn.setAttribute('id', `${json.id}`)
    })
    .catch(error => {
      console.log(error)
    })
  }


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
  selectPlatformPrompt.setAttribute('class', 'heading center fade-in')
  selectPlatformPrompt.innerHTML = 'Select your platform:'
  fadeInXSec(container1, selectPlatformPrompt, 1000)


  // adds 'Select' button
  const selectButton = document.createElement('button')
  selectButton.setAttribute('class', 'button fade-in')
  selectButton.innerHTML = 'Show'
  fadeInXSec(container2, selectButton, 2000)


  // loads the platform page
  const loadPlatforms = () => {
    adSizeLogo.setAttribute('class', 'fade-out')
    sleep(removeFromDom, adSizeLogo, 1000)
    navBar.remove()
    
    const thinNavBar = document.createElement('div')
    thinNavBar.setAttribute('class', 'thin-nav-bar')
    body.insertBefore(thinNavBar, main)
    main.style.height = "90%"

    fetch(PLATFORMS_URL)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(platform => {
        renderPlatform(platform)
        jsonResp.push(platform)
      })
    })
  }

  const renderPlatform = (platform) => {
    const platformDiv = document.createElement('div')
    platformDiv.setAttribute('class', 'platform-list-item-div center')

    const platformA = document.createElement('a')
    platformA.setAttribute('id', `${platform.id}`)

    if (isEven(platform.id)) {
      platformA.setAttribute('class', 'p-standard platform-item center')
    } else {
      platformA.setAttribute('class', 'p-alt platform-item center')
    }
    platformA.innerHTML = `${platform.name}`

    main.appendChild(platformDiv)
    platformDiv.appendChild(platformA)
    
    platformA.addEventListener("click", (event) => {
      const platformId = parseInt(event.target.id, 10)
      jsonResp.forEach(e => {
        if (platformId === e.id) {
          loadAdDimensions(e)
        }
        const platforms = document.getElementsByClassName('platform-list-item-div center')
        console.log(platforms)
        for (const div of platforms) {
          div.remove()
        }
        main.remove()
      })
    })
  }


  // loads ad dimensions for the parent platform
  const loadAdDimensions = (a) => {
    const dimenMainDiv = document.createElement('div')
    dimenMainDiv.setAttribute('id', 'ad-dimensions-main-div')
    a.ad_dimensions.forEach(dimen => {

      const dimenDiv = document.createElement('div')
      dimenDiv.setAttribute('class', 'ad-dimension-div')
      dimenDiv.setAttribute('style', `width: ${dimen.width}px; height: ${dimen.height}px; background-color: #ffffff;`)
      
      const dimenText = document.createElement('p')
      dimenText.setAttribute('class', 'ad-dimension-p')
      dimenText.innerHTML = `${dimen.width} x ${dimen.height}`
      fitty(dimenText)

      const dimenDescrip = document.createElement('p')
      dimenDescrip.setAttribute('class', 'ad-dimension-description')
      dimenDescrip.innerHTML = `${dimen.name}`

      const script = document.getElementById('js-script')

      body.insertBefore(dimenMainDiv, script)
      dimenMainDiv.appendChild(dimenDescrip)
      dimenMainDiv.appendChild(dimenDiv)
      dimenDiv.appendChild(dimenText)
    })
  }

  // Event Listeners
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
    selectPlatformPrompt.setAttribute('class', 'heading fade-out')
    sleep(removeFromDom, container1, 1000)
    sleep(removeFromDom, container2, 1000)
    loadPlatforms()
  }

  selectButton.addEventListener("click", buttonClick)
}