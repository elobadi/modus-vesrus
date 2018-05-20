/* Toggle the search-bar on click */
$('.form-group .fa-search').on('click', function () {
  $(this).parent().toggleClass('active');
});

/* dropdown effect fade in */
$('.dropdown').on('show.bs.dropdown', function (e) {
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
});

$('.dropdown').on('hide.bs.dropdown', function (e) {
  $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
});
