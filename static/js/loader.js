$('body').append('<div style="" id="loadingDiv"><div class="loader"><div class="preloader-wrapper big active">\n' +
    '      <div class="spinner-layer spinner-blue">\n' +
    '        <div class="circle-clipper left">\n' +
    '          <div class="circle"></div>\n' +
    '        </div><div class="gap-patch">\n' +
    '          <div class="circle"></div>\n' +
    '        </div><div class="circle-clipper right">\n' +
    '          <div class="circle"></div>\n' +
    '        </div>\n' +
    '      </div></div></div>');
$(window).on('load', function () {
    setTimeout(removeLoader, 2000);
});

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        $("#loadingDiv").remove();
    });
}