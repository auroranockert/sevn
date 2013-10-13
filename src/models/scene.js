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
}

Scene.prototype.push = function (dialogue) {
  this.dialogue = this.dialogue.concat(dialogue)
}

Scene.prototype.change_background = function (image) {
  return { command: 'change-background', scene: this, image: image }
}

Scene.prototype.changed_background = function (image) {
  document.getElementById('background').src = image.filename
}