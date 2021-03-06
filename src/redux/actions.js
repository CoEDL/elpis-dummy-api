import axios from 'axios'

// Use beeceptor to test API endpoints
const baseUrl = 'https://elpis.free.beeceptor.com'

const getApi = (url, successFunction) => {
  return dispatch => {
    axios.get(url)
      .then((resp) => {
        // If the API call went OK (HTTP status 200),
        // dispatch the success handler that came with the request
        dispatch(successHandler[successFunction](resp.data))
      }).catch((error) => {
        // For HTTP 400 error responses, dipatch a generic error
        // or we could use a similar pattern as success for custom actions
        dispatch(errorHandler(error))
      })
  }
}

const postApi = (url, postData, successFunction) => {
  return dispatch => {
    axios.post(url, postData)
      .then((resp) => {
        dispatch(successHandler[successFunction](resp))
      }).catch((error) => {
        dispatch(errorHandler(error))
      })
  }
}

// We can handle errors generically,
// or for custom handlers make an object like successHandler

const errorHandler = (data) => {
    return { type: 'API_ERROR', data }
}



// Lets bundle these 'success' actions into an object
// So we can dynamically call them from out API actions
// They don't need to be used directly in components

var successHandler = {
  // These are custom success actions for GET calls
  getNameSuccess: function(data) {
    return { type: 'GET_NAME_SUCCESS', data }
  },
  getAudioFilesSuccess: function(data) {
    return { type: 'GET_AUDIO_FILES_SUCCESS', data }
  },
  getTranscriptionFilesSuccess: function (data) {
    return { type: 'GET_TRANSCRIPTION_FILES_SUCCESS', data }
  },
  getAdditionalWordFilesSuccess: function (data) {
    return { type: 'GET_ADDITIONAL_WORD_FILES_SUCCESS', data }
  },
  getPronunciationDictionarySuccess: function (data) {
    return { type: 'GET_PRONUNCIATION_DICTIONARY_SUCCESS', data }
  },
  getSettingsSuccess: function (data) {
    return { type: 'GET_SETTINGS_SUCCESS', data }
  },
  // This is a generic success action, use it for POST calls
  apiSuccess: function (data) {
    return { type: 'API_SUCCESS', data }
  },
  // We could do custom success actions too, like this..
  updateNameSuccess: function (data) {
    return { type: 'UPDATE_NAME_SUCCESS', data }
  },
  // Custom success action for the test blob action
  testBlobSuccess: function (data) {
    return { type: 'TEST_BLOB_SUCCESS', data }
  }
}




// Export these actions so they _can_ be used in components

// ERRORS

// test error response from GET /name
export const testNameError = () => {
  const url = baseUrl + '/name-error'
  return getApi(url, 'getNameSuccess')
}

// GET

export const getName = () => {
  const url = baseUrl + '/name'
  return getApi(url, 'getNameSuccess')
}
export const getAudioFiles = () => {
  const url = baseUrl + '/audio-files'
  return getApi(url, 'getAudioFilesSuccess')
}
export const getTranscriptionFiles = () => {
  const url = baseUrl + '/transcription-files'
  return getApi(url, 'getTranscriptionFilesSuccess')
}
export const getAdditionalWordFiles = () => {
  const url = baseUrl + '/additional-word-files'
  return getApi(url, 'getAdditionalWordFilesSuccess')
}
export const getPronunciationDictionary = () => {
  const url = baseUrl + '/pronunciation-dictionary'
  return getApi(url, 'getPronunciationDictionarySuccess')
}
export const getSettings = () => {
  const url = baseUrl + '/settings'
  return getApi(url, 'getSettingsSuccess')
}

// POST

// the postData here is received by the beeceptor endpoint

// this action will result in a custom success action
export const updateName = (postData) => {
  const url = baseUrl + '/name'
  return postApi(url, postData, 'updateNameSuccess')
}
// these actions will result in generic success actions
export const updateAudioFiles = (postData) => {
  const url = baseUrl + '/audio-files'
  return postApi(url, postData, 'apiSuccess')
}
export const updateTranscriptionFiles = (postData) => {
  const url = baseUrl + '/transcription-files'
  return postApi(url, postData, 'apiSuccess')
}
export const updateAdditionalWordFiles = (postData) => {
  const url = baseUrl + '/additional-word-files'
  return postApi(url, postData, 'apiSuccess')
}
export const updatePronunciationDictionary = (postData) => {
  const url = baseUrl + '/pronunciation-dictionary'
  return postApi(url, postData, 'apiSuccess')
}
export const updateSettings = (postData) => {
  const url = baseUrl + '/settings'
  return postApi(url, postData, 'apiSuccess')
}

// TEST BLOB

export const testBlob = (postData) => {
  const url = baseUrl + '/test-blob'
  return postApi(url, postData, 'testBlobSuccess')
}

