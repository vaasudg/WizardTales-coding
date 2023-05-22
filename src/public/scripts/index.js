console.log('Index')

function getData(e) {
  const { url } = e.target.dataset
  const loader = document.getElementsByClassName('loader')
  loader[0].style.display = 'flex'
  console.log({ loader })
  if (!url) {
    return
  }

  e.target.classList.toggle('isOpened')
  if (e.target.classList.contains('isOpened')) {
    toggleFolderIcon(e, 'add')
    fetch('/readDir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
      .then(res => res.json())
      .then(data => {
        data?.dir?.map(item => {
          generateListView(e, item)
          loader[0].style.display = 'none'
        })
      })
      .catch(e => console.log({ 'Error....': e }))
  } else {
    e.target.querySelectorAll('ul').forEach(child => {
      child.remove()
      toggleFolderIcon(e, '')
    })
  }
}

function generateListView(element, html) {
  const ul = document.createElement('ul')
  const li = document.createElement('li')
  const liLicense = document.createElement('li')
  const liCopyright = document.createElement('li')
  if (html.type === 'dir') {
    li.dataset.url = html?.url
    li.classList.add('dir')
  }
  li.title = html?.name
  li.innerHTML = `
    <i class="fa fa-light ${html.type === 'dir' ? 'fa-folder' : 'fa-file'} "></i>
    ${html.name}
  `
  liLicense.innerHTML = ''
  liCopyright.innerHTML = `
    ${html.value}
  `
  ul.appendChild(li)
  ul.appendChild(liLicense)
  ul.appendChild(liCopyright)
  li.onclick = e => {
    getData(e)
  }
  element.target.appendChild(ul)
}

function toggleFolderIcon(el, cl) {
  const icon = el.target.querySelector('i')
  if (cl === 'add') {
    icon.classList.add('fa-folder-open')
    icon.classList.remove('fa-folder')
  } else {
    icon.classList.add('fa-folder')
    icon.classList.remove('fa-folder-open')
  }
}
