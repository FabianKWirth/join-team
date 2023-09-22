/**
 * Renders the contact menu within the specified container.
 * @param {HTMLElement} container - The container element to render the menu in.
 */
function renderContactMenu(container) {
    container.innerHTML = /*html*/ `
    <div class='responsive-contact-menu-container'>
      <div onclick='includeContactHTML("editContact")' class="responsive-menu" onmouseover="changeImage('assets/icons/edit-blue.svg', 'editImageResponsive')" onmouseout="changeImage('assets/icons/pen-icon.svg', 'editImageResponsive')">
        <img id="editImageResponsive" src="assets/icons/pen-icon.svg" alt="Edit Icon">
        <div>Edit</div>
      </div>
      <div onclick="deleteContact(selectedContact)" class="responsive-menu" onmouseover="changeImage('assets/icons/delete-blue.svg', 'trashImageResponsive')" onmouseout="changeImage('assets/icons/trashcan-icon.svg', 'trashImageResponsive')">
        <img id="trashImageResponsive" src="assets/icons/trashcan-icon.svg" alt="Delete Icon">
        <div>Delete</div>
      </div>
    </div>`;
}


/**
* Generates and renders an HTML template for the edit contact menu.
*
* This function populates the specified container with the HTML template for the
* edit contact menu, which includes options for editing and deleting a contact.
*
* @param {HTMLElement} container - The HTML element where the menu template will be rendered.
* @returns {void}
*/
function renderEditContactMenuTemplate(container) {
    container.innerHTML = /*html*/ `
    <div class='responsive-contact-menu-container'>
      <div onclick='includeContactHTML("editContact")' class="responsive-menu" onmouseover="changeImage('assets/icons/edit-blue.svg', 'editImageResponsive')" onmouseout="changeImage('assets/icons/pen-icon.svg', 'editImageResponsive')">
        <img id="editImageResponsive" src="assets/icons/pen-icon.svg" alt="Edit Icon">
          <div>Edit</div>
      </div>
      <div onclick="deleteContact(selectedContact)" class="responsive-menu" onmouseover="changeImage('assets/icons/delete-blue.svg', 'trashImageResponsive')" onmouseout="changeImage('assets/icons/trashcan-icon.svg', 'trashImageResponsive')">
        <img id="trashImageResponsive" src="assets/icons/trashcan-icon.svg" alt="Delete Icon">
          <div>Delete</div>
      </div>
    </div>`;
}


/**
 * Renders a letter header and a horizontal line in the specified list element.
 *
 * @param {HTMLElement} list - The list element where the letter header and line will be added.
 * @param {string} currentLetter - The letter to display in the header.
 */
function renderLetterHeader(list, currentLetter) {
    list.innerHTML += /*html*/ `
      <div class='contact-list-letter-header'>
          <p>${currentLetter}</p>
      </div>
      <div class='contact-list-horizontal-line'>
  
      </div>`;
}


/**
 * Renders a contact list item and adds it to the specified list element.
 *
 * @param {HTMLElement} list - The list element where the contact item will be added.
 * @param {number} contactIndex - The index of the contact to render from the contacts array.
 */
function renderContactListItem(list, contactIndex) {
    contacts = sortByUserName(contacts);
    let contact = contacts[contactIndex];
    contactName = contact["name"];
    contactMail = contact["mail"];
    let userIcon = getContactIconHtml(contact);
    list.innerHTML += renderContactListItemTemplate(contactIndex, contactName, contactMail, userIcon);
    getContactIconHtml(contact);
}


/**
 * Generates an HTML template for rendering a contact list item.
 *
 * @param {number} contactIndex - The index of the contact in the list.
 * @param {string} contactName - The name of the contact.
 * @param {string} contactMail - The email address of the contact.
 * @param {string} userIcon - The HTML content representing the user's icon or image.
 * @returns {string} The HTML template for the contact list item.
 */
function renderContactListItemTemplate(contactIndex, contactName, contactMail, userIcon) {
    return /*html*/ `
    <div class="contact-element" onclick='selectContact("${contactIndex}");markContactElementAsSelected(this)'>
        ${userIcon}
        <div class="contact-info">
            <p class="contact-name">${contactName}</p>
            <div class='contact-list-mail-text'>${contactMail}</div>
        </div>
    </div>
    `;
}


/**
 * Renders the list of contacts by iterating through the 'contacts' array.
 * The contacts are grouped by the first letter of their names, and a letter header
 * is displayed for each group. Each contact item is rendered using 'renderContactListItem'.
 * If a selected contact element is defined, it is marked as selected.
 */
function renderContacts() {
    let currentLetter = "";
    let list = document.getElementById("contactList");
    list.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        let thisCurrentLetter = contacts[i]["name"].charAt(0).toUpperCase();
        if (currentLetter != thisCurrentLetter) {
            currentLetter = thisCurrentLetter;
            renderLetterHeader(list, currentLetter);
        }
        renderContactListItem(list, i);
    }
    if (selectedContactListElement != null) {
        markContactElementAsSelected(selectedContactListElement);
    }
}


/**
 * Renders the body of the selected contact in the contact details view.
 * This function populates the selected contact's name, icon, email, and phone information,
 * and adds edit and delete options to the contact menu.
 */
function renderSelectedContactBody() {
    let contactElement = document.getElementById("selectedContactBody");
    let contact = contacts[selectedContact];
    let contactIcon = getContactIconHtml(contact);
    let contactName = contact["name"];
    let contactMail = contact["mail"];
    let contactPhone = contact["phone"];

    contactElement.innerHTML = renderSelectedContactBodyTemplate(contactIcon, contactName, contactMail, contactPhone);
}


/**
 * Generates an HTML template for rendering details of a selected contact.
 *
 * @param {string} contactIcon - The HTML content representing the contact's icon or image.
 * @param {string} contactName - The name of the contact.
 * @param {string} contactMail - The email address of the contact.
 * @param {string} contactPhone - The phone number of the contact.
 * @returns {string} The HTML template for the selected contact's details.
 */
function renderSelectedContactBodyTemplate(contactIcon, contactName, contactMail, contactPhone) {
    return /*html*/ `
    <div class="contact-detail-area">
        <div class='contact-name-row'>
            ${contactIcon}
            <div class="contacts-detail-container">
                <h2>  ${contactName}</h2>
                <div class="contact-menu">
                    <div id="editField" onclick='includeContactHTML("editContact")'>
                        <img src="./assets/icons/pen-icon.svg">
                        Edit
                    </div>
                    <div id="deleteField" onclick='deleteContact(selectedContact)'>
                        <img src="./assets/icons/trashcan-icon.svg">
                        Delete
                    </div>
                </div>
            </div>
        </div>
  
        <div class="contact-information-container">
            <p>Contact Information</p>
        </div> 
  
        <div class="contact-details">
            <div class="mail">
                <p><b>Email</b></p>
                <p class="mail-text">${contactMail}</p>
            </div>
            <div class="phone">
                <p><b>Phone</b></p>
                <p>${contactPhone}</p>
            </div>
        </div> 
    </div>
    `;
}


/**
 * Renders the notification layout within the selected contact container
 * or add task container if available.
 */
function renderContactNotificationLayout(target="selectedContactContainer") {
    let newDiv = document.createElement("div");
    newDiv.innerHTML +=/*html*/`
    <div class="shift-in" id="contactChangeNotificationContainer">
        <div class="contact-change-notification"><p class='change-contact-notification-text'></p></div>
    </div>`;
    if (document.getElementById(target) != null) {
        document.getElementById(target).appendChild(newDiv);
    } else if (document.getElementById("addTaskContainer")) {
        document.getElementById("addTaskContainer").appendChild(newDiv);
    }
}