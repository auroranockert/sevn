var Roll = function (formula, rolls, modifier) {
  this.formula = formula
  this.rolls = rolls
  this.modifier = modifier
  this.sum = rolls.reduce(function (sum, x) { return sum + x }) + this.modifier
}

var DiceSet = function (formula) {
  var matches = formula.match(/^(\d+)?([de])(\d+)([+-]\d+)?$/i)

  if (matches === null) {
    throw "Could not parse expression"
  }

  if (['d', 'e'].indexOf(matches[2]) === -1) {
    throw "Die types can only be 'd' or 'e', was '" + matches[2] + "'"
  } else {
    this.type = matches[2]
  }

  if (matches[3] === '0') {
    throw "Zero-sided dice, funny…"
  } else {
    this.sides = window.parseInt(matches[3], 10)
  }

  this.rolls = matches[1] ? window.parseInt(matches[1], 10) : 1
  this.modifier = matches[4] ? window.parseInt(matches[4], 10) : 0
}

Roll.prototype.toString = function () {
  if (this.modifier == 0) {
    return this.formula + ': ' + this.rolls.join(' + ') + ' = ' + this.sum
  } else {
    return this.formula + ': ' + this.rolls.join(' + ') + (this.modifier < 0 ? ' - ' : ' + ') + Math.abs(this.modifier) + ' = ' + this.sum
  }
}

var roll = function (sides, type) {
  switch (type) {
    case 'd':
      return 1 + Math.floor(Math.random() * sides)
    case 'e':
      var value = roll(sides, 'd')

      if (value === sides) {
        return value + roll(sides, 'e')
      } else {
        return value
      }
    default:
      throw "Unknown dice type"
  }
}

window.Dice = {
  roll: function (formula) {
    var set = new DiceSet(formula)

    var rolls = _.range(set.rolls).map(function () {
      return roll(set.sides, set.type)
    })

    var result = new Roll(formula, rolls, set.modifier)

    window.Dice.logger(result)

    return result
  },
  logger: function (result) {} // Default is to not log rolls
}
