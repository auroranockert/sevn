var later = new Scene({
  background: { filename: '/the-question/img/black.png', effect: 'dissolve' },
  inherit: ['audio']
})

later.push([
  narrator.say("And so I decided to ask her later."),
  narrator.say("But I was indecisive."),
  narrator.say("I couldn't ask her that day, and I couldn't ask her later."),
  narrator.say("I guess I will never know now."),

  c1.end()
])

c1.add_scene('later', later)