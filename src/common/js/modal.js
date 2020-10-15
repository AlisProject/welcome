(function ($) {
  $(function () {
    simpleModalWindow();
  });

  function simpleModalWindow() {
    var sp = 200; //アニメーション速度
    var win = $(window);
    var body = $('body');
    var bg = $('<div id="modal-bg"></div>');
    bg.css('opacity', '0');

    //モーダルウィンドウ表示クリックイベント
    $(document).on('click', '.modal', function () {
      var py = win.scrollTop();
      var wh = win.height();
      var self = $(this);
      var link = self.attr('href');
      var check = link.match(/^#.+/);
      var mWin = $(
        '<div id="modal-win"><div id="modal-win-inner"></div></div>'
      );
      var mInner = mWin.find('#modal-win-inner');
      mInner.css('opacity', '0');
      body.append(mWin);
      mWin.prepend(bg);
      if (!check) {
        mInner.append('<img src="' + link + '" alt="" />');
        var img = mWin.find('img');
        img.on('load', function () {
          view(img);
        });
      } else {
        var contents = $(link);
        mInner.append(contents);
        contents.css({ display: 'block', zIndex: '101' });
        view(contents);
      }
      function view(a_elm) {
        var w = a_elm.outerWidth();
        var h = a_elm.outerHeight();
        var mt = (wh - h) / 2 + py;
        bg.animate({ opacity: '.75' }, sp);
        mWin.css('top', mt + 'px');
        mInner.css({ width: w, height: h }).animate({ opacity: '1' }, sp);
      }
      return false;
    });

    //モーダルウィンドウ内要素変更クリックイベント
    $(document).on('click', '.modal-move', function () {
      var py = win.scrollTop();
      var wh = win.height();
      var self = $(this);
      var link = self.attr('href');
      var check = link.match(/^#.+/i);
      var mWin = $('#modal-win');
      var mInner = mWin.find('#modal-win-inner');
      if (check) {
        mInner.animate({ opacity: '0' }, sp, function () {
          var nowContents = $(this).children();
          body.append(nowContents);
          nowContents.hide();
          var contents = $(link);
          mInner.append(contents);
          contents.css({ display: 'block', zIndex: '101' });
          var w = contents.outerWidth();
          var h = contents.outerHeight();
          var mt = (wh - h) / 2 + py;
          bg.animate({ opacity: '.75' }, sp);
          mWin.css('top', mt + 'px');
          mInner.css({ width: w, height: h }).animate({ opacity: '1' }, sp);
        });
      }
      return false;
    });

    //モーダルウィンドウクローズクリックイベント
    $(document).on('click', '#modal-bg, .modal-close', function () {
      var mWin = $('#modal-win');
      var mInner = mWin.find('#modal-win-inner');
      var contents = mInner.children();
      mInner.animate({ opacity: '0' }, sp, function () {
        if (contents.attr('id')) {
          body.append(contents);
          contents.hide();
        }
        mWin.remove();
      });
      bg.animate({ opacity: '0' }, sp);
      return false;
    });
  }
})(jQuery);
