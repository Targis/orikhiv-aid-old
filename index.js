window.addEventListener('load', function () {
  const message = document.querySelector('.message')
  const alert = document.querySelector('.result')
  const spinner = document.querySelector('.spinner')

  const phoneInput = document.querySelector('#phoneNumber')
  const innInput = document.querySelector('#inn')
  const familySize = document.querySelector('#familySize')
  const children = document.querySelector('#children')
  const birthday = document.querySelector('#birthday')
  const vpoNumber = document.querySelector('#vpoNumber')
  const vpoDate = document.querySelector('#vpoDate')

  const form = document.getElementById('register-form')
  const qrNav = document.querySelector('.qr-nav')
  const qrs = document.querySelectorAll('.qr')

  const cities = [
    'Оріхів',
    'Копані',
    'Мирне',
    'Нестерянка',
    'Новоандріївка',
    'Новоданилівка',
    'Новопавлівка',
    'Щербаки',
  ]

  const socialStatuses = [
    'відсутній',
    'пенсіонер',
    'багатодітна родина',
    'особа з інвалідністю',
    'одинока мати (батько)',
    'малозабезпечена родина',
  ]

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

  /**
   * Masks
   * ========================================================================
   */

  var phoneMask = IMask(phoneInput, {
    mask: '+{38}(000)000-00-00',
    lazy: false,
  })

  // TODO find why this shit "^\d{10}$|^[А-ЩЬЮЯҐЄІЇ]{2}\d{6}$" do not work
  var innMask = IMask(innInput, {
    mask: '0000000000',
    lazy: false,
    placeholderChar: '#',
  })

  var familySizeMask = IMask(familySize, {
    mask: Number,
    min: 1,
    max: 100,
  })

  var childrenMask = IMask(children, {
    mask: Number,
    min: 1,
    max: 100,
  })

  var birthdayMask = IMask(birthday, {
    mask: Date,
    min: new Date(1900, 0, 1),
    max: new Date(2022, 1, 24),
    lazy: false,
  })

  var vpoNumberMask = IMask(vpoNumber, {
    mask: '0000-0000000000',
    lazy: false,
    placeholderChar: '#',
  })

  var vpoDateMask = IMask(vpoDate, {
    mask: Date,
    min: new Date(2022, 1, 24),
    lazy: false,
  })

  const streets = [
    {
      value: 0,
      label: '95-ої Гвардійської стрілецької дивізії, вулиця',
    },
    {
      value: 1,
      label: 'Академіка Вернадського, вулиця',
    },
    {
      value: 2,
      label: 'Академіка Вернадського, провулок',
    },
    {
      value: 3,
      label: 'Берегова, вулиця',
    },
    {
      value: 4,
      label: 'Березовий, провулок',
    },
    {
      value: 5,
      label: 'Богдана Хмельницького, вулиця',
    },
    {
      value: 6,
      label: 'Богдана Хмельницького, провулок',
    },
    {
      value: 7,
      label: 'Василя Стуса, провулок',
    },
    {
      value: 8,
      label: 'Вербна, вулиця',
    },
    {
      value: 9,
      label: 'Весняний, провулок',
    },
    {
      value: 10,
      label: 'Ветеринарна, вулиця',
    },
    {
      value: 11,
      label: 'Вишнева, вулиця',
    },
    {
      value: 12,
      label: 'Вишневий, провулок',
    },
    {
      value: 13,
      label: 'Водопровідна, вулиця',
    },
    {
      value: 14,
      label: 'Водопровідний, провулок',
    },
    {
      value: 15,
      label: 'Гагаріна, провулок',
    },
    {
      value: 16,
      label: 'Гаражна, вулиця',
    },
    {
      value: 17,
      label: 'Гвардійський, провулок',
    },
    {
      value: 18,
      label: 'Героїв АТО, вулиця',
    },
    {
      value: 19,
      label: 'Героїв АТО, провулок',
    },
    {
      value: 20,
      label: 'Героїв Крут, вулиця',
    },
    {
      value: 21,
      label: 'Гетьмана Сагайдачного, вулиця',
    },
    {
      value: 22,
      label: 'Гетьмана Сагайдачного, провулок',
    },
    {
      value: 23,
      label: 'Гоголя, вулиця',
    },
    {
      value: 24,
      label: 'Гоголя, провулок',
    },
    {
      value: 25,
      label: 'Горіхова, вулиця',
    },
    {
      value: 26,
      label: 'Громадянська, вулиця',
    },
    {
      value: 27,
      label: 'Громадянський, провулок',
    },
    {
      value: 28,
      label: 'Дачний, провулок',
    },
    {
      value: 29,
      label: 'Дмитра Донцова, вулиця',
    },
    {
      value: 30,
      label: 'Дмитра Донцова, провулок',
    },
    {
      value: 31,
      label: 'Дружби, провулок',
    },
    {
      value: 32,
      label: 'Дружний, провулок',
    },
    {
      value: 33,
      label: 'Елеваторна, вулиця',
    },
    {
      value: 34,
      label: 'Елеваторний, провулок',
    },
    {
      value: 35,
      label: 'Енергетиків, провулок',
    },
    {
      value: 36,
      label: 'Заводський, провулок',
    },
    {
      value: 37,
      label: 'Залізничний, провулок',
    },
    {
      value: 38,
      label: 'Запорізька, вулиця',
    },
    {
      value: 39,
      label: 'Зарічна, вулиця',
    },
    {
      value: 40,
      label: 'Зелений, провулок',
    },
    {
      value: 41,
      label: "Зої Космодем'янської, провулок",
    },
    {
      value: 42,
      label: 'Івана Богуна, вулиця',
    },
    {
      value: 43,
      label: 'Івана Мазепи, вулиця',
    },
    {
      value: 44,
      label: 'Йогана Янцена, вулиця',
    },
    {
      value: 45,
      label: 'Йогана Янцена, провулок',
    },
    {
      value: 46,
      label: 'Кар’єрна, вулиця',
    },
    {
      value: 47,
      label: 'Каштанова, вулиця',
    },
    {
      value: 48,
      label: 'Квіткова, вулиця',
    },
    {
      value: 49,
      label: 'Квітковий, провулок',
    },
    {
      value: 50,
      label: 'Київська, вулиця',
    },
    {
      value: 51,
      label: 'Кільцева, вулиця',
    },
    {
      value: 52,
      label: 'Кленова, вулиця',
    },
    {
      value: 53,
      label: 'Козача, вулиця',
    },
    {
      value: 54,
      label: 'Комарова, провулок',
    },
    {
      value: 55,
      label: 'Космічна, вулиця',
    },
    {
      value: 56,
      label: 'Космічний, провулок',
    },
    {
      value: 57,
      label: 'Лермонтова, провулок',
    },
    {
      value: 58,
      label: 'Лесі Українки, вулиця',
    },
    {
      value: 59,
      label: 'Лесі Українки, провулок',
    },
    {
      value: 60,
      label: 'Лізи Чайкіної, провулок',
    },
    {
      value: 61,
      label: 'Лікаря Лукашевича, вулиця',
    },
    {
      value: 62,
      label: 'Лугова, вулиця',
    },
    {
      value: 63,
      label: 'Луговий, провулок',
    },
    {
      value: 64,
      label: 'Марії Сокіл, вулиця',
    },
    {
      value: 65,
      label: 'Марії Сокіл, провулок',
    },
    {
      value: 66,
      label: 'Матросова, провулок',
    },
    {
      value: 67,
      label: 'Машинотракторна, вулиця',
    },
    {
      value: 68,
      label: 'Машинотракторний, провулок',
    },
    {
      value: 69,
      label: 'Металістів, вулиця',
    },
    {
      value: 70,
      label: 'Металістів, провулок',
    },
    {
      value: 71,
      label: 'Мирний, провулок',
    },
    {
      value: 72,
      label: 'Миру, вулиця',
    },
    {
      value: 73,
      label: 'Михайла Грушевського, вулиця',
    },
    {
      value: 74,
      label: 'Молодіжна, вулиця',
    },
    {
      value: 75,
      label: 'Наскрізний, провулок',
    },
    {
      value: 76,
      label: 'Новий, провулок',
    },
    {
      value: 77,
      label: 'Новорічна, вулиця',
    },
    {
      value: 78,
      label: 'Овчаренка, вулиця',
    },
    {
      value: 79,
      label: 'Озерна, вулиця',
    },
    {
      value: 80,
      label: 'Олега Кошового, провулок',
    },
    {
      value: 81,
      label: 'Олімпійський, провулок',
    },
    {
      value: 82,
      label: 'Оріхівський, провулок',
    },
    {
      value: 83,
      label: 'Павла Сергієнка, вулиця',
    },
    {
      value: 84,
      label: 'Паркова, вулиця',
    },
    {
      value: 85,
      label: 'Партизан, провулок',
    },
    {
      value: 86,
      label: 'Пелешка Миколи, вулиця',
    },
    {
      value: 87,
      label: 'Перемоги, провулок',
    },
    {
      value: 88,
      label: 'Південна, вулиця',
    },
    {
      value: 89,
      label: 'Пісочна, вулиця',
    },
    {
      value: 90,
      label: 'Пісочний, провулок',
    },
    {
      value: 91,
      label: 'Покровська, вулиця',
    },
    {
      value: 92,
      label: 'Покровський, провулок',
    },
    {
      value: 93,
      label: 'Польова, вулиця',
    },
    {
      value: 94,
      label: 'Привокзальна, вулиця',
    },
    {
      value: 95,
      label: 'Привокзальний, провулок',
    },
    {
      value: 96,
      label: 'Приходька, вулиця',
    },
    {
      value: 97,
      label: 'Пушкіна, провулок',
    },
    {
      value: 98,
      label: 'Райдужний, провулок',
    },
    {
      value: 99,
      label: 'Різдвяна, вулиця',
    },
    {
      value: 100,
      label: 'Річна, вулиця',
    },
    {
      value: 101,
      label: 'Робочий, провулок',
    },
    {
      value: 102,
      label: 'Садова, вулиця',
    },
    {
      value: 103,
      label: 'Садовий, провулок',
    },
    {
      value: 104,
      label: 'Соборна, вулиця',
    },
    {
      value: 105,
      label: 'Соборний, провулок',
    },
    {
      value: 106,
      label: 'Сонячна, вулиця',
    },
    {
      value: 107,
      label: 'Сонячний, провулок',
    },
    {
      value: 108,
      label: 'Спортивна, вулиця',
    },
    {
      value: 109,
      label: 'Стадіонна, вулиця',
    },
    {
      value: 110,
      label: 'Стадіонний, провулок',
    },
    {
      value: 111,
      label: 'Степна, вулиця',
    },
    {
      value: 112,
      label: 'Суворова, вулиця',
    },
    {
      value: 113,
      label: 'Суворова, провулок',
    },
    {
      value: 114,
      label: 'Таврійська, вулиця',
    },
    {
      value: 115,
      label: 'Таврійський, провулок',
    },
    {
      value: 116,
      label: 'Тихий, провулок',
    },
    {
      value: 117,
      label: 'Тіниста, вулиця',
    },
    {
      value: 118,
      label: 'Травнева, вулиця',
    },
    {
      value: 119,
      label: 'Травневий, провулок',
    },
    {
      value: 120,
      label: 'Тупиковий, провулок',
    },
    {
      value: 121,
      label: 'Українська, вулиця',
    },
    {
      value: 122,
      label: 'Український, провулок',
    },
    {
      value: 123,
      label: 'Фестивальна, вулиця',
    },
    {
      value: 124,
      label: 'Фестивальний, провулок',
    },
    {
      value: 125,
      label: 'Франка, вулиця',
    },
    {
      value: 126,
      label: 'Центральна, вулиця',
    },
    {
      value: 127,
      label: 'Чайковського, провулок',
    },
    {
      value: 128,
      label: 'Чарівний, провулок',
    },
    {
      value: 129,
      label: 'Черемшина, вулиця',
    },
    {
      value: 130,
      label: 'Шевченка, вулиця',
    },
    {
      value: 131,
      label: 'Шевченка, провулок',
    },
    {
      value: 132,
      label: 'Шкільний, провулок',
    },
    {
      value: 133,
      label: 'Шовкова, вулиця',
    },
    {
      value: 134,
      label: 'Щаслива, вулиця',
    },
    {
      value: 135,
      label: 'Ювілейна, вулиця',
    },
    {
      value: 136,
      label: 'Ювілейний, провулок',
    },
    {
      value: 137,
      label: 'Юрія Смірнова, провулок',
    },
    {
      value: '',
      label: 'Оберіть із списку',
      selected: true,
    },
  ]

  const streetInput = document.querySelector('#streetInput')
  const streetSelect = document.querySelector('#streetSelect')

  const choices = new Choices(streetSelect, {
    choices: streets,
    placeholder: false,
    placeholderValue: 'Оберіть із списку',
    searchPlaceholderValue: 'Почніть вводити назву тут...',
    loadingText: 'Завантаження...',
    noResultsText: 'Нічого не знайдено',
    itemSelectText: 'Натисніть, щоб обрати',
    classNames: {
      containerOuter: 'choices streetChoices',
    },
  })

  const choicesElement = document.querySelector('.streetChoices')
  const city = document.querySelector('#city')

  city.addEventListener('input', (e) => {
    if (e.target.value === '0') {
      streetInput.hidden = true
      streetInput.disabled = true
      streetInput.required = false
      streetInput.removeAttribute('name')

      streetSelect.setAttribute('name', 'street')
      streetSelect.required = true
      streetSelect.disabled = false

      choicesElement.hidden = false
    } else {
      choicesElement.hidden = true

      streetInput.setAttribute('name', 'street')
      streetInput.required = true
      streetInput.disabled = false
      streetInput.hidden = false

      streetSelect.disabled = true
      streetSelect.required = false
      streetSelect.removeAttribute('name')
    }
  })

  /**
   * ========================================================================
   */

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
          const currentCity = data.get('city')

          // if it is Orikhiv and we have a list of the city streets
          if (currentCity === '0') {
            data.set('street', streets[+data.get('street')].label)
          }
          data.set('city', cities[+currentCity])
          data.set('socialStatus', socialStatuses[+data.get('socialStatus')])

          const action = e.target.action
          try {
            fetch(action, {
              method: 'POST',
              body: data,
            })
              .then((response) => {
                return response.json()
              })
              .then((data) => {
                console.log(data)
                if (data.result === 'success') {
                  alert.innerHTML = `<p>Ви успішно зареєструвались у черзі.</p>
                <p>Ваш номер: <strong style="font-size: 1.5em;">${data.number}</strong>. Цей номер потрібно зберегти (записати).</p>
                `

                  message.classList.remove('d-none')
                  alert.classList.add('alert-success')
                  spinner.classList.add('d-block')
                }

                if (data.result === 'refused') {
                  alert.innerHTML = `<p>Відмова.</p>
                <p>${data.reason} </p>
                <p>Номер в черзі <strong>${data.number}</strong></p>`
                  alert.classList.add('alert-warning')
                  message.classList.remove('d-none')
                }

                if (data.result === 'error') {
                  alert.textContent = `<p>Помилка на сервері. Спробуйте пізніше.</p>
                  <p class="font-monospace">${data.error}</p>`
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
