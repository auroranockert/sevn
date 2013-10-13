var marry = new Scene({
  background: { filename: '/the-question/img/black.png', effect: 'dissolve' }
})

marry.push([
  sylvie.change_image({ detach: true }),

  narrator.say("--- years later ---"),

  rightaway.change_background({ filename: '/the-question/img/club.jpg', effect: 'dissolve' }),

  narrator.say("And so, we became a visual novel creating team."),
  narrator.say("We made games and had a lot of fun making them."),

  /* function () {
    if (bl_game) {
      return [narrator.say("Well, apart from that Boy's Love game she insisted on making.")]
    } else {
      return []
    }
  }, */

  narrator.say("And one day..."),

  sylvie.change_image({filename: "/the-question/img/sylvie2_normal.png", position: s2_pos }),

  sylvie.say("Hey..."),
  me.say("Yes?"),

  sylvie.change_image({filename: "/the-question/img/sylvie2_giggle.png", position: s2_pos }),

  sylvie.say("Marry me!"),
  me.say("What???"),

  sylvie.change_image({filename: "/the-question/img/sylvie2_surprised.png", position: s2_pos }),

  sylvie.say("Well, don't you love me?"),
  me.say("I do, actually."),

  sylvie.change_image({filename: "/the-question/img/sylvie2_smile.png", position: s2_pos }),

  sylvie.say("See? We've been making romantic visual novels, spending time together, helping each other…"),
  sylvie.say("… and when you give love to others, love will come to you."),
  me.say("Hmmme.say(that's a nice thought."),

  sylvie.change_image({filename: "/the-question/img/sylvie2_giggle.png", position: s2_pos }),

  sylvie.say("I just made that up."),
  me.say("But it's good."),

  sylvie.change_image({filename: "/the-question/img/sylvie2_normal.png", position: s2_pos }),

  sylvie.say("I know. So, will you marry me?"),
  me.say("Ummm, of course I will. I've actually been meaning to ask you, but since you brought it up…"),
  sylvie.say("I know, but you are so indecisive, that I thought I'd take the initiative. "),
  me.say("I guess… It's all about asking the right question… at the right time."),

  sylvie.change_image({filename: "/the-question/img/sylvie2_giggle.png", position: s2_pos }),

  sylvie.say("It is. But now, stop being theoretical, and give me a kiss!"),

  rightaway.change_background({ filename: '/the-question/img/black.png', effect: 'dissolve' }),

  narrator.say("And we got married shortly after that."),
  narrator.say("In fact, we made many more visual novels."),
  narrator.say("And together, we lived happily ever after."),

  c1.end()
])

c1.add_scene('marry', marry)
