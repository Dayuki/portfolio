function initJQuery() {
  const $window = window.$(window);
  const $body = window.$('body');
  const $nav = window.$('#nav');
  $clickables = window.$('.item');

  // Breakpoints.
  breakpoints({
    wide: ['961px', '1880px'],
    normal: ['961px', '1620px'],
    narrow: ['961px', '1320px'],
    narrower: ['737px', '960px'],
    mobile: [null, '736px'],
  });

  // Play initial animations on page load.
  $window.on('load', () => {
    $clickables.each(function () {
      window.$(this).on('click', () => {
        console.log();
        if (window.$(this).data('path') == 'assets/projects/AcheronEscape/Main.swf') { return; }
        window.$('embed').attr('src', window.$(this).data('path'));
      });
    });
    // for (var i = 0; i < $clickables.length; i++) {
    // 	$clickables[i].on("click", function(){
    // 		console.log("oui");
    // 	})
    // }
    window.setTimeout(() => {
      $body.removeClass('is-preload');
    }, 100);
  });

  window.$('#contact-form').submit(function (e) {
    e.preventDefault();
    const ar = window.$(this).serializeArray();
    window.$.post('assets/php/contact.php', ar, (data) => {
      console.log(window.$('input[name=email]'));
      window.$('input[name=email]').val('');
      window.$('input[name=name]').val('');
      window.$('input[name=object]').val('');
      window.$('textarea[name=message]').val('Message sent!');
    });
  });

  // Nav.
  const $nav_a = $nav.find('a');

  $nav_a
    .addClass('scrolly')
    .on('click', function (e) {
      const $this = window.$(this);

      // External link? Bail.
      if ($this.attr('href').charAt(0) != '#') { return; }

      // Prevent default.
      e.preventDefault();

      // Deactivate all links.
      $nav_a.removeClass('active');

      // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
      $this
        .addClass('active')
        .addClass('active-locked');
    })
    .each(function () {
      const $this = window.$(this);
      const id = $this.attr('href');
      const $section = window.$(id);

      // No section for this link? Bail.
      if ($section.length < 1) { return; }

      // Scrollex.
      $section.scrollex({
        mode: 'middle',
        top: '-10vh',
        bottom: '-10vh',
        initialize() {
          // Deactivate section.
          $section.addClass('inactive');
        },
        enter() {
          // Activate section.
          $section.removeClass('inactive');

          // No locked links? Deactivate all links and activate this section's one.
          if ($nav_a.filter('.active-locked').length == 0) {
            $nav_a.removeClass('active');
            $this.addClass('active');
          }

          // Otherwise, if this section's link is the one that's locked, unlock it.
          else if ($this.hasClass('active-locked')) { $this.removeClass('active-locked'); }
        },
      });
    });

  // Scrolly.
  window.$('.scrolly').scrolly();

  // Header (narrower + mobile).

  // Toggle.
  window.$(
    '<div id="headerToggle">'
            + '<a href="#header" class="toggle"></a>'
            + '</div>',
  )
    .appendTo($body);

  // Header.
  window.$('#header')
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'left',
      target: $body,
      visibleClass: 'header-visible',
    });
}
