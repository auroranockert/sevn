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

function Chapter() {
  this.scenes = {}
  this.queue = []
}

Chapter.prototype.start = function (name) {
  this.current = { scene: this.scenes[name], line: 0 }
}

Chapter.prototype.end = function () {
  { command: 'end' }
}

Chapter.prototype.play = function () {
  if (this.current.line == 0) {
    this.current.scene.start()
  }

  var line = this.current.scene.dialogue[this.current.line]

  if (!line) {
    throw "Running out of lines…"
  }

  switch (line.command) {
  case 'say':
    document.getElementById('dialog').innerHTML = Views.say(line); break
  case 'jump':
    this.current = { scene: this.scenes[line.scene], line: 0 }; return this.play()
  case 'change-image':
    line.actor.changed_image(line.image); this.current.line += 1; return this.play()
  case 'change-background':
    line.scene.changed_background(line.image); this.current.line += 1; return this.play()
  case 'end':
    throw 'end-error'
  default:
    throw "Lulzerror"
  }

  this.current.line += 1
}

Chapter.prototype.add_scene = function (name, scene) {
  this.scenes[name] = scene
}

Chapter.prototype.jump = function (scene) {
  return { command: 'jump', scene: scene }
}
