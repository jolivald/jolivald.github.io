//jQuery(function($) {
document.addEventListener('DOMContentLoaded', () => {
  const $bodyEl = document.body;
  const $sidedrawerEl = document.getElementById('sidedrawer');

  function showSidedrawer() {
    // show overlay
    var options = {
      onclose: function() {
        $sidedrawerEl.classList.remove('active');
        $bodyEl.appendChild($sidedrawerEl);
      }
    };

    const $overlayEl = mui.overlay('on', options);

    // show element
    $overlayEl.appendChild($sidedrawerEl);
    setTimeout(() => {
      $sidedrawerEl.classList.add('active');
    }, 20);
  }


  function hideSidedrawer() {
    $bodyEl.classList.toggle('hide-sidedrawer');
  }

  document.querySelectorAll('.js-show-sidedrawer')
    .forEach(trigger => trigger.addEventListener('click', showSidedrawer));
  document.querySelectorAll('.js-hide-sidedrawer')
    .forEach(trigger => trigger.addEventListener('click', hideSidedrawer));
});