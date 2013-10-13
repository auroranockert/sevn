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

Chapter.prototype.run_command = function (command) {
  switch (command.command) {
  case 'say':
    document.getElementById('dialog').innerHTML = Views.say(command)
    return
  case 'jump':
    this.current = { scene: this.scenes[command.scene], line: 0 }
    return
  case 'change-image':
    command.actor.changed_image(command.image)
    return
  case 'change-background':
    command.scene.changed_background(command.image)
    return
  case 'menu':
    command.scene.show_menu(this, command.options)
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

  if (this.queue.length > 0) {
    var command = this.queue.shift()
  } else {
    var command = this.current.scene.dialogue[this.current.line]

    this.current.line += 1
  }

  if (!command) {
    throw "Running out of lines…"
  }

  if (Array.isArray(command)) {
    for (var i = 0; i < command.length; i++) {
      this.run_command(command[i])
    }
  } else if (typeof command == 'function') {
    this.queue = command().concat(this.queue); this.play()
  } else {
    this.run_command(command)
  }

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
