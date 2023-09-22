let selectedContact = null;
let selectedContactListElement = null;



/**
 * Asynchronously initializes the contacts page.
 * This function includes HTML Header and Sidebar content, initializes contacts, and sets user header initials.
 */
async function contactsInit() {
  await includeHTML(3);
  await init();
  renderContacts();
  setCurrentShownMobileClass();
  setUserHeaderInitials();
  addResponsiveEditTaskMenuEventListeners();
}


/**
 * Empties the content of the selected contact's body in the contact details view.
 * This function clears the innerHTML of the element with the ID "selectedContactBody,"
 * effectively removing any previously displayed contact information.
 */
function emptySelectedContactBody() {
  let contactElement = document.getElementById("selectedContactBody");
  contactElement.innerHTML = "";
}


/**
 * Selects a contact based on its index and updates the display accordingly.
 *
 * @param {number} contactIndex - The index of the contact to be selected.
 */
function selectContact(contactIndex) {
  selectedContact = contactIndex;
  setCurrentShownMobileClass();
  renderSelectedContactBody();
}


/**
 * Deletes a contact from the 'contacts' array, updates local storage, and refreshes the display.
 *
 * @param {number} contactIndex - The index of the contact to be deleted.
 */
function deleteContact(contactIndex) {
  contacts.splice(contactIndex, 1);
  setItem("contacts", contacts);
  renderContacts();
  emptySelectedContactBody();
  removeElementsByPartialClassName("add-contact");
  renderContactDeleteElement();
}


/**
 * Removes the "selected" class from all user elements in the document.
 * This function searches for elements with the "selected" class and removes the class from each element.
 */
function unmarkAllUserElements() {
  selectedElements = document.getElementsByClassName("selected");
  if (selectedElements.length > 0) {
    for (let index = 0; index < selectedElements.length; index++) {
      const selectedElement = selectedElements[index];
      selectedElement.classList.remove("selected");
    }
  }
}


/**
 * Marks a contact element as selected by adding the "selected" class.
 * This function unmarks all other user elements, adds the "selected" class to the specified element,
 * and updates the reference to the selected contact list element.
 *
 * @param {HTMLElement} element - The contact element to be marked as selected.
 */
function markContactElementAsSelected(element) {
  unmarkAllUserElements();
  element.classList.add("selected");
  selectedContactListElement = element;
}


/**
 * Sorts an array of contacts by their name in alphabetical order.
 * @param {Array} contacts - The array of contacts to be sorted.
 * @returns {Array} A new array containing the sorted contacts.
 */
function sortByUserName(contacts) {
  return contacts.slice().sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}


/**
 * Sets the appropriate CSS class to show or hide contact-related elements on mobile devices.
 * If no contact is selected (selectedContact is null), it hides the selected contact container
 * and shows the contact list section on mobile. If a contact is selected, it does the opposite.
 */
function setCurrentShownMobileClass() {
  if (selectedContact == null) {
    document.getElementById("selectedContactContainer")
      .classList.add("contact-hide-on-mobile");
    document.getElementById("contactListSection")
      .classList.remove("contact-hide-on-mobile");
  } else {
    document.getElementById("selectedContactContainer")
      .classList.remove("contact-hide-on-mobile");
    document.getElementById("contactListSection")
      .classList.add("contact-hide-on-mobile");
  }
}


/**
 * Unsets the selected contact, unmarks all user elements, and sets the current shown mobile class.
 */
function unsetSelectedContact() {
  selectedContact = null;
  unmarkAllUserElements();
  setCurrentShownMobileClass();
}


/**
 * Toggles the mobile responsive contact menu.
 * If the menu is empty, it populates it with edit and delete options.
 * If the menu is already populated, it removes the menu.
 */
function toggleEditContactMenu() {
  let container = document.getElementById("responsiveMenuContainer");
  if (container.innerHTML == "") {
    renderEditContactMenuTemplate(container);
  } else {
    removeMobileContactMenu(container);
  }
}


/**
 * Adds event listeners for handling responsive edit task menu interactions.
 */
function addResponsiveEditTaskMenuEventListeners() {
  document.addEventListener('click', function (event) {
    if (!event.target.classList.contains('responsive-contact-menu-container') && !event.target.classList.contains('menu-button-mobile')) {
      removeMobileContactMenuByClassName();
    }
  });


  document.addEventListener('touch', function (event) {
    if (!event.target.classList.contains('responsive-contact-menu-container')) {
      removeMobileContactMenuByClassName();
    }
  });
}


/**
 * Removes mobile contact menus with a specific class name.
 */
function removeMobileContactMenuByClassName() {
  let containers = document.getElementsByClassName('responsive-menu-container');
  for (let i = 0; i < containers.length; i++) {
    const container = containers[i];
    removeMobileContactMenu(container);
  }
}


/**
 * Removes the mobile contact menu with a transition effect.
 * @param {HTMLElement} container - The container element to remove the menu from.
 */
function removeMobileContactMenu(container) {
  container.classList.add("let-contact-menu-disappear");
  setTimeout(() => {
    container.innerHTML = "";
  }, 500);
}