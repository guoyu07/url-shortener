const axios = require('axios')
const reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
let url = document.getElementById('input-url')
let code = document.getElementById('input-code')
let submitBtn = document.getElementById('submit-btn')
let res = document.getElementById('response')
submitBtn.addEventListener('click',submit,false)
function submit(){
  if(!reg.test(url.value)) {
    url.classList.add('error')
    res.innerHTML = '<span class="error">Invalid url: '+ url.value + '</span>'
    return
  }
  submitBtn.disabled = true
  submitBtn.classList.add('loading')
  axios({
    url: 'https://git.io',
    method: 'post',
    data: {
      url:url.value,
      code: code.value
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        if(data[it].trim()){
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
      }
      return ret
    }]
  })
    .then(function (response) {
      res.innerHTML = 'your short url : <a>' + response.headers.location + '</a>'
      url.classList.remove('error')
      submitBtn.classList.remove('loading')
      submitBtn.disabled = false
    })
    .catch(function (error) {
      console.log(error.response)
      res.innerHTML = '<span class="error">'+ error.response.data + '</span>'
      url.classList.add('error')
      submitBtn.classList.remove('loading')
      submitBtn.disabled = false
    });
}