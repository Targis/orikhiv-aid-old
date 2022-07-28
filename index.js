window.addEventListener('load', function () {
  const alert = document.querySelector('.alert')
  const spinner = document.querySelector('.spinner')
  const form = document.getElementById('register-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    form.classList.add('d-none')
    spinner.classList.remove('d-none')

    const data = new FormData(form)
    const action = e.target.action
    try {
      fetch(action, {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((data) => {
          console.log(data)
          if (data.result === 'success') {
            alert.innerHTML = `<p>Ви успішно зареєструвались у черзі.</p>
            <p>Ваш номер: <strong style="font-size: 1.5em;">${data.row}</strong></p>
            <p>Підпишіться на канал Telegram <a href="https://t.me/orikhiv_next" target="_blank">@orikhiv_next</a>, щоб дізнатись коли за вашим номером буде видаватись гуманітарна допомога.</p>
            <p><img src="./img/orikhiv_next.jpg" alt="QR code" class="qr" /></p>`

            alert.classList.remove('d-none')
            spinner.classList.add('d-block')
          }

          if (data.result === 'refused') {
            alert.textContent = data.reason
            alert.classList.add('alert-warning')
            alert.classList.remove('d-none')
          }

          if (data.result === 'error') {
            alert.textContent = 'Помилка на сервері. Спробуйте пізніше.'
            alert.classList.add('alert-danger')
            alert.classList.remove('d-none')
          }
        })
        .finally(() => {
          spinner.classList.add('d-none')
        })
    } catch (error) {
      throw new Error(error)
    }
  })
})
