void (function () {
  var roll_one_dice = function (sides, type) {
    switch (type) {
      case 'd':
        return 1 + Math.floor(Math.random() * sides)
      case 'e':
        var value = roll_one_dice(sides, 'd')

        if (value === sides) {
          return value + roll_one_dice(sides, 'e')
        } else {
          return value
        }
      default:
        throw "Unknown dice type"
    }
  }

  var roll_dice = function (set) {
    return Array.range(1, set.rolls).map(function () {
      return roll_one_dice(set.sides, set.type)
    })
  }

  var roll_prototype = Object.create(Object.prototype, {
    sum: {
      get: function  () {
        return this.rolls.reduce(function (sum, x) { return sum + x }) + this.modifier
      }, enumerable: true
    }
  })

  var roll_against_prototype = Object.create(roll_prototype, {
    mos: {
      get: function () {
        return this.success ? this.sum - this.tn : -1
      }, enumerable: true
    },
    mof: {
      get: function () {
        return this.success ? -1 : this.tn - this.sum
      }, enumerable: true
    },
    success: {
      get: function () {
        if (this.rolls.length + this.modifier === this.sum) {
          return false
        } else {
          return this.sum >= this.tn
        }
      }, enumerable: true
    }
  })

  var dice_set_prototype = Object.create(Object.prototype, {
    roll: {
      value: function () {
        return Object.new(roll_prototype, {
          modifier: this.modifier,
          rolls: roll_dice(this),
          formula: this.formula
        })
      }
    },
    roll_against: {
      value: function (tn) {
        return Object.new(roll_against_prototype, {
          modifier: this.modifier,
          rolls: roll_dice(this),
          formula: this.formula,
          tn: tn
        })
      }
    }
  })

  window.Dice = {
    set: function (formula) {
      if (typeof formula === 'string') {
        var matches = formula.match(/^(\d+)?([de])(\d+)([+-]\d+)?$/i)

        if (matches === null) {
          throw "Could not parse expression"
        }

        if (['d', 'e'].indexOf(matches[2]) === -1) {
          throw "Die types can only be 'd' or 'e', was '" + matches[2] + "'"
        }

        if (matches[3] === '0') {
          throw "Zero-sided dice, funny…"
        }

        return Object.new(dice_set_prototype, {
          formula: formula,
          modifier: matches[4] ? window.parseInt(matches[4], 10) : 0,
          rolls: matches[1] ? window.parseInt(matches[1], 10) : 1,
          sides: window.parseInt(matches[3], 10),
          type: matches[2]
        })
      } else {
        return Object.new(dice_set_prototype, {
          formula: formula,
          modifier: formula.modifier || 0,
          rolls: formula.rolls || 1,
          sides: formula.sides,
          type: formula.type || 'd'
        })
      }
    },
    roll: function (formula) {
      return Dice.set(formula).roll()
    },
    roll_against: function (formula, tn) {
      return Dice.set(formula).roll_against(tn)
    }
  }
})()