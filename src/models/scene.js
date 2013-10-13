/*
 * SeVN - The sunday evening VN engine
 * Copyright (C) 2013  Jens Nockert
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function Scene(options) {
  this.dialogue = []
  this.options = options
}

Scene.prototype.start = function () {
  if (this.options.background) {
    this.changed_background(this.options.background)
  }

  var novel = document.getElementById('novel')
  var avatars = document.querySelectorAll(".avatar")

  for (var i = 0; i < avatars.length; i++) {
    novel.removeChild(avatars[i])
  }
}

Scene.prototype.push = function (dialogue) {
  this.dialogue = this.dialogue.concat(dialogue)
}

Scene.prototype.changed_background = function (image) {
  document.getElementById('background').src = image.filename
}

Scene.prototype.show_menu = function (chapter, menu) {
  this.waiting = true

  var novel = document.getElementById('novel')

  for (var i = 0; i < menu.length; i++) {
    var item = document.createElement('div')

    item.innerHTML = Views.menu(menu[i])
    item.className = 'menu-item'

    item.onclick = function (scene) {
      scene.waiting = false

      var items = document.querySelectorAll(".menu-item")

      for (var j = 0; j < items.length; j++) {
        novel.removeChild(items[j])
      }

      if (this.command) {
        chapter.run_command(this.command)
      }

      if (this.list) {
        chapter.queue = this.list.concat(chapter.queue)
      }

      chapter.play()
    }.bind(menu[i], this)

    menu[i].scene = this

    novel.appendChild(item)
  }
}

Scene.prototype.change_background = function (image) {
  return { command: 'change-background', scene: this, image: image }
}

Scene.prototype.menu = function (options) {
  return { command: 'menu', scene: this, options: options }
}