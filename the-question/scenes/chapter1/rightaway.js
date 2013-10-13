var rightaway = new Scene({
  background: { filename: '/the-question/img/uni.jpg' }
})

rightaway.push([
  [
    sylvie.change_image({ filename: '/the-question/img/sylvie_smile.png', position: s1_pos }),
    sylvie.say("Oh, hi, do we walk home together?" )
  ],
  me.say("Yes…"),
  narrator.say("I said and my voice was already shaking."),

  [
    rightaway.change_background({ filename: '/the-question/img/meadow.jpg', effect: 'dissolve' }),
    narrator.say("We reached the meadows just outside our hometown.")
  ],
  narrator.say("Autumn was so beautiful here."),
  narrator.say("When we were children, we often played here."),
  me.say("Hey… ummm…"),

  [
    sylvie.change_image({ filename: "/the-question/img/sylvie_smile.png", position: s1_pos }),
    narrator.say("She turned to me and smiled.")
  ],
  narrator.say("I'll ask her…"),
  me.say("Ummm… will you…"),
  me.say("Will you be my artist for a visual novel?"),

  [
    sylvie.change_image({ filename: "/the-question/img/sylvie_surprised.png", position: s1_pos }),
    narrator.say("Silence.")
  ],
  narrator.say("She is shocked. And then…"),

  [
    sylvie.change_image({ filename: "/the-question/img/sylvie_smile.png", position: s1_pos }),
    sylvie.say("Sure, but what is a 'visual novel?'")
  ],

  start.menu([
    { text: "It's a story with pictures", list: [
      me.say("It's a story with pictures and music."),
      me.say("And you'll be able to make choices that influence the outcome of the story."),
      sylvie.say("So it's like those choose-your-adventure books?"),
      me.say("Exactly! I plan on making a small romantic story."),
      me.say("And I figured you could help me… since I know how you like to draw."),

      [
        sylvie.change_image({ filename: '/the-question/img/sylvie_normal.png', position: s1_pos }),
        sylvie.say("Well, I can try. I hope I don't disappoint you.")
      ],
      [
        me.say("You can't disappoint me, you know that."),
        c1.jump('marry')
      ]
    ]},
    { text: "It's a hentai game.", list: [
      function () {
        bl_game = true
        return [me.say("Why it's a game with lots of sex.")]
      },
      sylvie.say("You mean, like a boy's love game?"),
      sylvie.say("I've always wanted to make one of those."),
      sylvie.say("I'll get right on it!"),

      sylvie.change_image({ detach: true }),

      narrator.say("…"),
      [
        me.say("That wasn't what I meant!"),
        c1.jump('marry')
      ]
    ]}
  ])
])

c1.add_scene('rightaway', rightaway)
