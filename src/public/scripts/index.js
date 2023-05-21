console.log('Index')
function getData(e) {
  const { url } = e.target.dataset
  if (!url) {
    return
  }

  fetch('/readDir', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  })
    .then(res => res.json())
    .then(data => {
      const c = document.createElement('p')
      c.innerHTML = JSON.stringify(data)
      c.onclick = e => {
        alert()
      }
      e.target.appendChild(c)
      console.log({ data })
    })
    .catch(e => console.log({ 'Error....': e }))

  console.log(e.target)
}
