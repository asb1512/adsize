import User from './user';
import Platform from './platform';

const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;

const allPlatforms = [];

// instantiate FB ad platform
const facebookPlatform = new Platform(1, 'Facebook', [
  { name: 'Standard', width: 1200, height: 628 },
  { name: 'Sponsored Message', width: 1080, height: 1080 },
  { name: 'Standard Carousel', width: 1080, height: 1080 },
]);
allPlatforms.push(facebookPlatform);

// instantiate Google ad platform
const googlePlatform = new Platform(2, 'Google', [
  { name: 'Small Square', width: 200, height: 200 },
  { name: 'Vertical rectangle', width: 240, height: 400 },
  { name: 'Square', width: 250, height: 250 },
  { name: 'Triple Widescreen', width: 250, height: 360 },
  { name: 'Inline Rectangle', width: 300, height: 250 },
  { name: 'Large Rectangle', width: 336, height: 280 },
  { name: 'Netboard', width: 580, height: 400 },
  { name: 'Skyscraper', width: 120, height: 600 },
  { name: 'Wide Skyscraper', width: 160, height: 600 },
  { name: 'Half-Page Ad', width: 300, height: 600 },
  { name: 'Portrait', width: 300, height: 1050 },
  { name: 'Banner', width: 468, height: 60 },
  { name: 'Leaderboard', width: 728, height: 90 },
  { name: 'Top Banner', width: 930, height: 180 },
  { name: 'Large Leaderboard', width: 970, height: 90 },
  { name: 'Billboard', width: 970, height: 250 },
  { name: 'Panorama', width: 980, height: 120 },
  { name: 'Mobile Banner', width: 300, height: 50 },
  { name: 'Mobile Banner V2', width: 320, height: 50 },
  { name: 'Large Mobile Banner', width: 320, height: 100 },
]);
allPlatforms.push(googlePlatform);

// instantiate Yahoo ad platform
const yahooPlatform = new Platform(3, 'Yahoo', [
  { name: 'Main Image', width: 1200, height: 627 },
  { name: 'Icon Image', width: 82, height: 82 },
  { name: 'Sponsor Marker - Small', width: 20, height: 20 },
  { name: 'Sponsor Marker – Large', width: 40, height: 40 },
]);
allPlatforms.push(yahooPlatform);

// allows an instance of a User or Platform to be assigned and accessed globally
let currentPlatform;
let currentUser;

// checks for user cookie
const checkForUserCookie = () => {
  const key = 'adSizeUid';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};
const cookieCheckResult = checkForUserCookie();

const body = document.querySelector('body');
const navBar = document.getElementsByClassName('nav-bar')[0];
const notesSideBar = document.getElementsByClassName('sidenav')[0];
const main = document.querySelector('main');
const notesSignInMessage = document.getElementById('notes-signin-message');

const isEven = (int) => {
  return (int % 2 === 0);
};

function openNav() {
  document.getElementById("mySidenav").style.width = '400px';
}

function closeNav() {
  document.getElementById("mySidenav").style.width = '0';
}

document.addEventListener('DOMContentLoaded', () => onPageLoad());

function onPageLoad() {
  // takes a callback function and waits a specified amount of time
  // to execute said function
  const sleep = async (cbFunc, domElement, milliseconds) => {
    await new Promise((r) => setTimeout(r, milliseconds));
    cbFunc(domElement, milliseconds);
  };

  // allows elements to fade in after a specified period of time
  const fadeInXSec = async (parent, child, milliseconds) => {
    await new Promise((r) => setTimeout(r, milliseconds));
    parent.appendChild(child);
  };

  const removeFromDom = (domElement, milliseconds) => {
    domElement.remove();
  };


  // adds logo to page
  const adSizeLogo = document.createElement('img');
    adSizeLogo.setAttribute('id', 'ad-size-logo');
    adSizeLogo.setAttribute('class', 'fade-in');
    adSizeLogo.setAttribute('src', 'AdSize-Logo.png');
    navBar.appendChild(adSizeLogo);


  // adds email label form and 'enter' button if no current user
  const addEmailForm = () => {
    const emailForm = document.createElement('form');
    emailForm.setAttribute('class', 'email-form');
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email-input');
    const emailInput = document.createElement('input');
    emailInput.setAttribute('id', 'email-input');
    emailInput.setAttribute('placeholder', 'Enter your email');
    emailInput.setAttribute('style', 'margin: 1em;');
    const emailSubmitButton = document.createElement('button');
    emailSubmitButton.setAttribute('id', 'email-form-button');
    emailSubmitButton.setAttribute('class', 'platform-item');
    emailSubmitButton.innerHTML = 'Submit';
    // adds event listener and prevents default form submission
    emailForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputText = document.getElementById('email-input');
      regexEmail(inputText.value);
    });
    // appending email entry form
    navBar.appendChild(emailForm);
    emailForm.appendChild(emailLabel);
    emailForm.appendChild(emailInput);
    emailForm.appendChild(emailSubmitButton);
  };

  // adds a welcome user and retrieves stored notes
  const addWelcomeMsg = (email) => {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.setAttribute('class', 'welcome-msg');
  };

  // checks if a cookie was successfully retrieved
  if (cookieCheckResult) {
    // set welcome message text
    // retrieve notes
  } else {
    addEmailForm();
  }

  const createCookie = (email) => {
    document.cookie = `adSizeUid=${email}`;
  };

  // runs Regex to verify that email isn't an empty string and that it containes
  //  essential characters i.e. '@' '.'
  const regexEmail = (email) => {
    const regex = new RegExp(/[@.]+/g);
    if (regex.test(email)) {
      createCookie(email);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  // displays all user's list items
  const displayUserList = () => {
    emailForm.remove();
    notesSignInMessage.remove();
    openNav();
    // switch this out for local storage
    currentUser.list.list_items.forEach(item => {
      const notesAn = document.createElement('a');
      notesAn.setAttribute('id', `${item.id}`);
      notesAn.setAttribute('href', '#');
      notesAn.innerHTML = item.message;
      notesSideBar.appendChild(notesAn);
      // adds event listener to each list item anchor that is appended
      notesAn.addEventListener("click", event => {
        event.target.setAttribute('style', 'text-decoration: line-through;');
        deleteListItem(event.target.id);
      });
    });

    const updateCurrentUserObjDelete = listItemId => {
      currentUser.list.list_items.forEach(e => {
        let index = currentUser.list.list_items.indexOf(e);
        if (e.id === listItemId) {
          currentUser.list.list_items.splice(index, 1);
        }
      });
    };

    // sends DELETE request to delete user's selected list item
    const deleteListItem = (id) => {
      const deleteListItemUrl = `${USERS_URL}/${currentUser.id}/lists/${currentUser.list.id}/list_items/${id}`;

      const configObj = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      };

      updateCurrentUserObjDelete(parseInt(id, 10));
      fetch(deleteListItemUrl, configObj);
    };

    // creates 'Add new note' button
    const newNoteAn = document.createElement('a');
    newNoteAn.setAttribute('href', '#');
    newNoteAn.setAttribute('id', 'create-new-note');
    newNoteAn.innerHTML = '&#43; Add new note';
    notesSideBar.appendChild(newNoteAn);

    // listens for click on 'Add new note' anchor
    newNoteAn.addEventListener('click', (event) => {
      const newNoteDiv = document.createElement('div');
      newNoteDiv.setAttribute('id', 'new-note-div');

      // creates a text input for new list item
      const newNoteInput = document.createElement('input');
      newNoteInput.setAttribute('id', 'new-note-input');
      newNoteInput.setAttribute('type', 'text');
      newNoteInput.setAttribute('placeholder', 'Enter your note');

      // adds text input and parent div to DOM
      newNoteDiv.appendChild(newNoteInput);
      notesSideBar.insertBefore(newNoteDiv, newNoteAn);

      // if user presses enter key, calls addNewUserNote()
      newNoteInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          addNewUserNote(event.target.value);
        }
      });
    });
  };

  // adds new user list item to user's list and POSTs to API
  const addNewUserNote = (message) => {
    const newNoteAn = document.getElementById('create-new-note');
    const newNoteDiv = document.getElementById('new-note-div');
    newNoteDiv.remove();

    const notesAn = document.createElement('a');
    notesAn.setAttribute('href', '#');
    notesAn.innerHTML = message;
    notesSideBar.insertBefore(notesAn, newNoteAn);

    notesAn.addEventListener('click', (event) => {
      event.target.setAttribute('style', 'text-decoration: line-through;');
      deleteListItem(event.target.id);
    });

    const listItemsUrl = `${USERS_URL}/${currentUser.id}/lists/
    ${currentUser.list.id}/list_items`;

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ message: message }),
    };

    fetch(listItemsUrl, configObj)
      .then(resp => resp.json())
      .then(json => {
        notesAn.setAttribute('id', `${json.id}`);
        currentUser.list.list_items.push(json);
      })
      .catch(error => {
        console.log(error);
      });
  };


  // adds 2 containers within main tag
  const container1 = document.createElement('div');
  container1.setAttribute('id', 'select-your-platform-div-1');
  const container2 = document.createElement('div');
  container2.setAttribute('id', 'select-your-platform-div-2');
  container2.setAttribute('class', 'center');
  main.appendChild(container1);
  main.appendChild(container2);


  // adds 'Select your platform' prompt
  const selectPlatformPrompt = document.createElement('p');
  selectPlatformPrompt.setAttribute('id', 'select-platform-prompt');
  selectPlatformPrompt.setAttribute('class', 'heading center fade-in');
  selectPlatformPrompt.innerHTML = 'Select your platform:';
  fadeInXSec(container1, selectPlatformPrompt, 1000);


  // adds 'Select' button
  const selectButton = document.createElement('button');
  selectButton.setAttribute('class', 'button fade-in');
  selectButton.innerHTML = 'Show';
  fadeInXSec(container2, selectButton, 2000);


  // loads the platform page
  const loadPlatforms = () => {
    adSizeLogo.setAttribute('class', 'fade-out');
    sleep(removeFromDom, adSizeLogo, 1000);
    navBar.remove();

    const thinNavBar = document.createElement('div');
    thinNavBar.setAttribute('class', 'thin-nav-bar');
    body.insertBefore(thinNavBar, main);
    main.style.height = "90%";

    for (const platform of allPlatforms) {
      renderPlatform(platform);
    }
  };

  const renderPlatform = (platform) => {
    const platformDiv = document.createElement('div');
    platformDiv.setAttribute('class', 'platform-list-item-div center');

    const platformA = document.createElement('a');
    platformA.setAttribute('id', `${platform.id}`);

    if (isEven(platform.id)) {
      platformA.setAttribute('class', 'p-standard platform-item center');
    } else {
      platformA.setAttribute('class', 'p-alt platform-item center');
    }
    platformA.innerHTML = `${platform.name}`;

    main.appendChild(platformDiv);
    platformDiv.appendChild(platformA);

    platformA.addEventListener("click", (event) => {
      const platformId = parseInt(event.target.id, 10);
      allPlatforms.forEach(e => {
        if (platformId === e.id) {
          loadAdDimensions(e);
        }
        const platforms = document.getElementsByClassName('platform-list-item-div center');
        for (const div of platforms) {
          div.remove();
        }
        main.remove();
      });
    });
  };


  // loads ad dimensions for the parent platform
  const loadAdDimensions = (a) => {
    const dimenMainDiv = document.createElement('div');
    dimenMainDiv.setAttribute('id', 'ad-dimensions-main-div');
    a.adDimensions.forEach((dimen) => {
      const dimenDiv = document.createElement('div');
      dimenDiv.setAttribute('class', 'ad-dimension-div');
      dimenDiv.setAttribute('style', `width: ${dimen.width}px; height: ${dimen.height}px; background-color: #ffffff;`);

      const dimenText = document.createElement('p');
      dimenText.setAttribute('class', 'ad-dimension-p');
      dimenText.innerHTML = `${dimen.width} x ${dimen.height}`;
      // fitty(dimenText)

      const dimenDescrip = document.createElement('p');
      dimenDescrip.setAttribute('class', 'ad-dimension-description');
      dimenDescrip.innerHTML = `${dimen.name}`;

      const script = document.getElementById('js-script');

      body.insertBefore(dimenMainDiv, script);
      dimenMainDiv.appendChild(dimenDescrip);
      dimenMainDiv.appendChild(dimenDiv);
      dimenDiv.appendChild(dimenText);
    });
  };

  // Event Listeners
  selectButton.addEventListener('mouseover', (event) => {
    event.target.style.backgroundColor = '#52796f';
    event.target.style.color = '#2f3e46';
  }, false);

  selectButton.addEventListener('mouseout', (event) => {
    event.target.style.backgroundColor = '#cad2c5';
    event.target.style.color = '#52796f';
  }, false);

  const buttonClick = (event) => {
    event.target.setAttribute('class', 'button fade-out');
    selectPlatformPrompt.setAttribute('class', 'heading fade-out');
    sleep(removeFromDom, container1, 1000);
    sleep(removeFromDom, container2, 1000);
    loadPlatforms();
  };

  selectButton.addEventListener('click', buttonClick);
}
