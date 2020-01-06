/* eslint-disable no-undef */


const root = document.getElementById('root');

const displayForm = () => {
  const form = document.createElement('form');
  form.innerHTML = `
  <section>
      <div>
        <div class="sign-up">
          <div class="signup__form">
            <form action="#" class="form">
              <div>
                <h2 class="heading">
                Sign up for Films and reviews
                </h2>
              </div>
              <div class="form__group">
                <input type="email" class="form__input" placeholder="Email address" id="email" required>
                <label for="email" class="form__label">Email Address</label>
              </div>
              <div class="form__group">
                <input type="password" class="form__input" placeholder="Password" id="password" required>
                <label for="password" class="form__label">Password</label>
              </div>
              </div>
              <div class="form__group">
                <button class="sign">Next step &rarr;</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
`;

  form
    .addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const user = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(() => {
          window.location.reload();
        });
    });

  root.appendChild(form);
};

const displayUser = user => {
  const h1 = document.createElement('h1');
  h1.textContent = user.email;

  root.appendChild(h1);
};

fetch('/api/v1/auth/verify', {
  credentials: 'include'
})
  .then(res => res.json())
  .then(user => {
    if(user._id) {
      displayUser(user);
    } else {
      displayForm();
    }
  });
fetch('/api/v1/auth/verify', {
  credentials: 'include'
})
  .then(res => res.json())
  .then(user => {
    if(user._id) {
      window.location.href = 'Film/index.html';
    } else {
      displayLogin();
    }
  });


