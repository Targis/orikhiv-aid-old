window.addEventListener('load', function () {
  const alert = document.querySelector('.alert')
  const spinner = document.querySelector('.spinner')
  const phoneInput = document.querySelector('#phoneNumber')
  const form = document.getElementById('register-form')

  var phoneMask = IMask(phoneInput, {
    mask: '+{38}(000)000-00-00',
  })

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
          const footer = `<p>З одного номеру можна зареєструватись лише один раз.</p>
          <p>Підпишіться на канал Telegram <a href="https://t.me/orikhiv_next" target="_blank">@orikhiv_next</a>, щоб дізнатись коли за вашим номером буде видаватись гуманітарна допомога.</p>
          <p><img src="./img/orikhiv_next.jpg" alt="QR code" class="qr" /></p>`
          if (data.result === 'success') {
            alert.innerHTML = `<p>Ви успішно зареєструвались у черзі.</p>
            <p>Ваш номер: <strong style="font-size: 1.5em;">${data.row}</strong></p>
            ${footer}`

            alert.classList.remove('d-none')
            alert.classList.add('alert-success')
            spinner.classList.add('d-block')
          }

          if (data.result === 'refused') {
            alert.innerHTML = `<p>Відмова.</p>
            <p>Користувач з номером телефону ${data.phoneNumber} вже був зареєстрований в черзі під номером: <strong>${data.number}</strong></p>
            ${footer}`
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
