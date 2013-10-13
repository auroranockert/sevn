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

function Position(x, y) {
  this.x = x, this.y = y
}

Position.prototype.equals = function (other) {
  return _.isEqual(this, other)
}

Position.prototype.clone = function () {
  return _.clone(this)
}

Position.prototype.absolute = function () {
  return [this.x, this.y]
}

function RelativePosition(x, y, anchor) {
  this.x = x, this.y = y, this.anchor = anchor
}

RelativePosition.prototype.equals = function (other) {
  return _.isEqual(this, other)
}

RelativePosition.prototype.clone = function () {
  return _.clone(this)
}

RelativePosition.prototype.absolute = function () {
  var node = document.getElementById('novel')

  var width = node.scrollWidth
  var height = node.scrollHeight

  return [this.anchor.x + width * this.x, this.anchor.y + height * this.y]
}
