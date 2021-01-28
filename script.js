const text = document.getElementById('text')

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const speechrecognisation = new SpeechRecognition()
speechrecognisation.interimResults = true
speechrecognisation.lang = 'en-US'
speechrecognisation.maxAlternatives = 1

const click = document.querySelector('.button')
let p = document.createElement('p')
const words = document.querySelector('.words')
words.appendChild(p)

click.addEventListener('click', function () {
  speechrecognisation.start()
})

speechrecognisation.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('')
  if (e.results[0].isFinal) {
    p = document.createElement('p')
    p.textContent = transcript
    words.appendChild(p)
  }
  console.log(transcript)
})

//speechrecognisation.addEventListener('end', speechrecognisation.start)

speechrecognisation.addEventListener('soundstart', function () {
  console.log('speech started')
  text.style.display = 'block'
  text.textContent = 'Recording....'
})

speechrecognisation.addEventListener('error', function (e) {
  console.log('Error Occured')
  text.style.display = 'block'
  text.textContent = 'Error occured is' + e.error
})

speechrecognisation.addEventListener('soundend', function () {
  console.log('speech ended')
  text.textContent = 'Recording Stopped'
  setTimeout(function () {
    text.style.display = 'none'
  }, 2000)
})
