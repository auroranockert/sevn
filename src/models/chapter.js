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

function run_command(self, command) {
  switch (command.command) {
  case 'say':
    document.getElementById('dialog').innerHTML = Views.say(command)
    return
  case 'jump':
    self.current = { scene: self.scenes[command.scene], line: 0 }
    return
  case 'change-image':
    command.actor.changed_image(command.image)
    return
  case 'change-background':
    command.scene.changed_background(command.image)
    return
  case 'end':
    throw 'end-error'
  default:
    throw "Lulzerror"
  }
}

Chapter.prototype.play = function () {
  if (this.current.line == 0) {
    this.current.scene.start()
  }

  var command = this.current.scene.dialogue[this.current.line]

  if (!command) {
    throw "Running out of lines…"
  }

  if (Array.isArray(command)) {
    for (var i = 0; i < command.length; i++) {
      run_command(this, command[i])
    }
  } else {
    run_command(this, command)
  }

  this.current.line += 1
}

Chapter.prototype.add_scene = function (name, scene) {
  this.scenes[name] = scene
}

Chapter.prototype.jump = function (scene) {
  return { command: 'jump', scene: scene }
}

Chapter.prototype.end = function () {
  return { command: 'end' }
}
