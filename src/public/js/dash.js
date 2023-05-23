// document.querySelector(".jsFilter").addEventListener("click", function () {
//   document.querySelector(".filter-menu").classList.toggle("active");
// });

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper").classList.add("gridView");
  document
    .querySelector(".products-area-wrapper")
    .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper").classList.remove("gridView");
  document.querySelector(".products-area-wrapper").classList.add("tableView");
});

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
  document.documentElement.classList.toggle('light');
  modeSwitch.classList.toggle('active');
});

const sidebarList = document.querySelector('.sidebar-list');
const listItems = sidebarList.getElementsByTagName('li');

for (let i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener('click', function() {
    const currentActive = sidebarList.querySelector('.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }
    this.classList.add('active');
  });
}