var start = new Scene({
  background: { filename: '/the-question/img/lecturehall.jpg' }
})

start.push([
  narrator.say("Well, the professor's lecture was interesting."),
  narrator.say("But to be honest, I couldn't concentrate on it very much."),
  narrator.say("I had a lot of other thoughts on my mind."),
  narrator.say("And they all ended up with a question; a question I've been meaning to ask someone."),

  [
    start.change_background({ filename: '/the-question/img/uni.jpg', effect: 'dissolve' }),
    narrator.say("When we came out of the university, I saw her.")
  ],

  [
    sylvie.change_image({ filename: '/the-question/img/sylvie_normal.png', position: s1_pos }),
    narrator.say("She was a wonderful person.")
  ],
  narrator.say("I've known her ever since we were children, and she's always been a good friend."),
  narrator.say("But recently, I think…"),
  narrator.say("… that I wanted more."),
  narrator.say("More than just talking… more than just walking home together when our classes ended."),
  [
    narrator.say("And I decided…"),
    c1.jump('rightaway')
  ]
])

c1.add_scene('start', start)