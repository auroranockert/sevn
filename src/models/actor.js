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

function Actor(name, escaped_name) {
  this.name = name, this.escaped_name = escaped_name

  this.image_element = document.createElement('img')
  this.image_element.setAttribute('id', this.escaped_name + '-image')
  this.image_element.setAttribute('class', 'avatar')
}

Actor.prototype.changed_image = function (options) {
  if (options.detach) {
    document.getElementById('novel').removeChild(this.image_element)
  } else {
    var pos = options.position.absolute()

    this.image_element.src = options.filename
    this.image_element.style.position = "absolute"
    this.image_element.style.left = Math.floor(pos[0]) + "px"
    this.image_element.style.top = Math.floor(pos[1]) + "px"

    document.getElementById('novel').appendChild(this.image_element)
  }
}

Actor.prototype.say = function (text) {
  return { command: 'say', actor: this, text: text }
}

Actor.prototype.change_image = function (image) {
  return { command: 'change-image', actor: this, image: image }
}