const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', ()=> modal.classList.remove('show-modal'));
window.addEventListener('click', (e)=>(e.target === modal? modal.classList.remove('show-modal') : false));

// Validate Form
function validate(nameValue, urlValue){
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if(!nameValue || !urlValue) {
    alert('Please submit values sfor both fields.');
    return false;
  }
  if(urlValue.match(regex)){
    alert('Please provide a valid web address');
    return false;
  }
  // Valid
  return true;
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if(localStorage.getItem('bookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    //Create bookmarks array in localStorage
    bookmarks = [
      {
        name: 'Hero Patterns',
        url: 'https://heropatterns.com/'
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}

// Handle Data from Form
function storeBookmark(e){
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('http://', 'https://')){
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);
  if(!validate(nameValue, urlValue)){
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();

}

// Event Listner
bookmarkForm.addEventListener('submit', storeBookmark);
// On Load, feth bookamrks
fetchBookmarks();