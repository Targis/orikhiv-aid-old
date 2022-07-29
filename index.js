window.addEventListener('load', function () {
  const message = document.querySelector('.message')
  const alert = document.querySelector('.alert')
  const spinner = document.querySelector('.spinner')
  const phoneInput = document.querySelector('#phoneNumber')
  const form = document.getElementById('register-form')

  const qrNav = document.querySelector('.qr-nav')

  const qrs = document.querySelectorAll('.qr')

  qrNav.addEventListener('click', (e) => {
    // console.log(e)
    if (e.target.classList.contains('qr-nav-link')) {
      qrs.forEach((el) => {
        el.classList.contains('qr-' + e.target.dataset.qr)
          ? el.classList.remove('d-none')
          : el.classList.add('d-none')
      })
    }
  })

  var phoneMask = IMask(phoneInput, {
    mask: '+{38}(000)000-00-00',
  })

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    grecaptcha.ready(function () {
      grecaptcha
        .execute('6LdSei4hAAAAANIwvkc9jnDol_v2cJ0KDdmHJFJp', {
          action: 'submit',
        })
        .then(function (token) {
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
                <p>Телефон: ${data.phoneNumber}</p>`

                  message.classList.remove('d-none')
                  alert.classList.add('alert-success')
                  spinner.classList.add('d-block')
                }

                if (data.result === 'refused') {
                  alert.innerHTML = `<p>Відмова.</p>
                <p>Користувач з номером телефону ${data.phoneNumber} вже був зареєстрований в черзі під номером: <strong>${data.number}</strong></p>`
                  alert.classList.add('alert-warning')
                  message.classList.remove('d-none')
                }

                if (data.result === 'error') {
                  alert.textContent = `Помилка на сервері. Спробуйте пізніше. <br />
                  ${data.error}`
                  alert.classList.add('alert-danger')
                  message.classList.remove('d-none')
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
  })
})
