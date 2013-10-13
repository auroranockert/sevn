function init_novel() {
  c1.start('start')
  c1.play()
}

window.onkeypress = function () {
  if (!c1.current.scene.waiting) {
    c1.play()
  }
}

Views = {}

function download_views() {
  var views = [
    { name: 'say', filename: '/src/views/say.handlebars' },
    { name: 'menu', filename: '/src/views/menu.handlebars' }
  ]

  for (var i = 0; i < views.length; i++) {
    var view = views[i]

    var req = new XMLHttpRequest()

    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        Views[view.name] = Handlebars.compile(req.responseText);
      }
    }

    req.open("GET", view.filename, false);
    req.send();
  }
}

download_views()