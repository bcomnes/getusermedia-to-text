# getusermedia-to-text

getUserMedia to Text via Google's Speech to Text API.

```
npm install getusermedia-to-text
```


# Usage

```js
var GetUserMediaToSpeech = require('getusermedia-to-text')
var s2t = new GetUserMediaToSpeech({
  projectId: 'your-project-id',
  keyFilename: path.join(__dirname, 'auth.json')
  // request: { options }
})

s2t.on('error', console.error)
s2t.on('status', console.log)
s2t.on('listening', function (isListening) {
  isListening ? console.log('Listening!') : console.log('Stopped Listening!')
})
s2t.on('data', console.log)

s2t.listening()
s2t.stop()
```

# API

#### `var s2t = new GetUserMediaToSpeech(options)`

Create a new speech to text instance.

Options include:

- `keyFilename` (required): path to your auth.json file.
- `projectId`: your project id string. Default: `getusermedia-to-text`
- `request`: the request options object.  Default:

```js
{
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 44100,
    languageCode: 'en-US'
  },
  singleUtterance: false,
  interimResults: false
  // verbose: true
}
```

#### `s2t.start()`

Start listening to audio.  Will event speech events as `data`.

#### `s2t.stop()`

Stop listening to audio and destroy internal recognition stream.

### `s2t` events:

- `error`: Emitted when an error is encountered with the error object.
- `status`: General status message strings.
- `listening`: Emits boolean listening status data when the listening status changes.
- `data`: Raw data objects that are emitted from the  `@google-cloud/speech` library.
