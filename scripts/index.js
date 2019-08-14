// DOM elements
const propertyList = document.querySelector('.property');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');


const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup properties
const setupProperties = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const property = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${property.property_name} </div>
          <div class="collapsible-body white">Price: ${property.price} </div>
          <div class="collapsible-body white">Rating: ${property.rating} </div>
          <div class="collapsible-body white">Amenities: ${property.amenities} </div>
        </li>
      `;
      html += li;
    });
    propertyList.innerHTML = html
  } else {
    propertyList.innerHTML = '<h5 class="center-align">Login to view Properties</h5>';
  }
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});