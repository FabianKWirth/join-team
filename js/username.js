const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const username = params.name;
const userInitials = getUserInitials({ username: username });

// data must still be loaded from the server
/**
 * This function loads the account data from the server
 */
function getUserInitials(user) {
  if (typeof username !== 'undefined') {
    const userNameParts = user["username"].split(" ");
    if (userNameParts[1] != null) {
      userSignature =
        userNameParts[0][0].toUpperCase() + userNameParts[1][0].toUpperCase();
    } else {
      userSignature =
        userNameParts[0][0].toUpperCase() +
        userNameParts[0].slice(-1).toUpperCase();
    }
    return userSignature;
  }
  return "";
}

/**
 * Generates the initials of a contact based on their name.
 *
 * @function
 * @param {Object} contact - The contact object for which to generate the initials.
 * @returns {string} A string containing the contact's initials in uppercase.
 */
function setUserHeaderInitials() {
  let myAccount = document.getElementById("myAccount");
  let myAccountResponsiv = document.getElementById("myAccount-responsive");
  if (myAccount) {
    myAccount.innerHTML = userInitials;
  }
  if (myAccountResponsiv) {
    myAccountResponsiv.innerHTML = userInitials;
  }
}