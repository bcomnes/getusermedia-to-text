var choo = require('choo')
var html = require('choo/html')
var app = choo()
var SpeechToText = require('../')
var path = require('path')
var log = require('choo-log')
var s2t = new SpeechToText({
  projectId: 'getusermedia-to-text',
  keyFilename: path.join(__dirname, 'auth.json')
})

window.s2t = s2t

app.use(log())
app.use(store)

app.route('/', view)
app.mount('#app')

function store (state, bus) {
  state.msgs = []
  state.listening = false

  s2t.on('error', logError)
  function logError (error) {
    state.msgs.push(error.message)
  }
  s2t.on('status', log)
  function log (data) {
    state.msgs.push(data)
    bus.emit('render')
  }

  s2t.on('data', apiLog)
  function apiLog (data) {
    state.msgs.push(JSON.stringify(data))
    bus.emit('render')
  }

  s2t.on('listening', function (status) {
    state.listening = status
    bus.emit('render')
  })

  bus.on('clear', clear)
  function clear () {
    state.msgs = []
    bus.emit('render')
  }

  bus.on('listen', listen)
  function listen () {
    s2t.start()
  }

  bus.on('stop', stop)
  function stop () {
    s2t.stop()
  }
}

function view (state, emit) {
  return html`
    <main>
      <div>
        ${state.listening
          ? html`<button onclick=${() => emit('stop')}>stop</button>`
          : html`<button onclick=${() => emit('listen')}>start</button>`}
      </div>
      <div>output</div>
      <div>
        ${state.msgs.map(msg => html`
          <div>${msg}</div>
        `)}
      </div>
    </main>
  `
}
