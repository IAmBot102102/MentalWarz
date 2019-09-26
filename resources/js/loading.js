if (jQuery) {
  $(document).ready(function() {
    init();
  });
} else {
  throw new Error("Please have jQuery installed to use the loading!!!");
}

function init() {
  if (typeof window["loader"] !== "undefined")
    throw new Error("Loader is already initialized.");
  $("html").append('<div class="loader"></div>');
  $(
    '<style class="loader">.loader { display: block; position: absolute; padding: 0px; margin: 0px; width: 100%; height: 100%; top: 0px; left: 0px; opacity: 0; background-color: whitesmoke; clip-path: circle(100%); transition: opacity 0.7s} .loader::after {content:""; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2em; color: white; font-family: sans-serif} .loader.shown {display: block; opacity: 1; clip-path: circle(100%)}</style>'
  ).appendTo("head");
  window["loader"] = {};
  window.loader.startLoad = function startLoad() {
    $("div.loader").addClass("shown");
  };

  function htmlToElements(html) {
    var template = document.createElement("template");
    template.innerHTML = html;
    return template.content.childNodes;
  }

  window.loader.loadPage = async function loadPage(page, _page = page) {
    window.loader._clearLoad();
    window.history.replaceState({}, "", page);
    let toAdd = await $.ajax({ url: _page, type: "GET" });
    toAdd = toAdd
      .replace('<script src="/resources/js/jquery.min.js"></script>', "")
      .replace('<script src="/resources/js/jcanvas.min.js"></script>', "")
      .replace(
        '<script class="loader" src="/resources/js/loading.js"></script>',
        ""
      )
      .replace("<title>", '<div style="display:none">')
      .replace("</title>", "</div>");
    console.log($("html")[0]);
    console.log(htmlToElements(toAdd));
    // $('script.loader')[0].insertBefore(htmlToElements(toAdd), $('script.loader')[0].firstChild);
    $("body").prepend(toAdd);
    await $(function() {
      eval(
        $(document)
          .find("script")
          .text()
      );
    });
  };

  window.loader._clearLoad = function _clearLoad() {
    // var save = $(".loader").detach();
    $("body").empty();
    // .append(save);
  };
  window.loader.endLoad = function endLoad() {
    $("div.loader").removeClass("shown");
  };
  window.loader.load = async function(page, _page = page) {
    window.loader.startLoad();
    setTimeout(() => {
      window.loader.loadPage(page, _page).then(() => {
        setTimeout(window.loader.endLoad, 200);
      });
    }, 750);
  };
}
