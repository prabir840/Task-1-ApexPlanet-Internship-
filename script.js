document.addEventListener('DOMContentLoaded', () => {
  // Contact form validation
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const formStatus = document.getElementById('form-status');

  function setError(inputEl, message) {
    const errorEl = document.getElementById(`${inputEl.id}-error`);
    if (errorEl) errorEl.textContent = message;
    inputEl.setAttribute('aria-invalid', 'true');
  }

  function clearError(inputEl) {
    const errorEl = document.getElementById(`${inputEl.id}-error`);
    if (errorEl) errorEl.textContent = '';
    inputEl.removeAttribute('aria-invalid');
  }

  function isEmailValid(value) {
    // Simple, user-friendly email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailPattern.test(value);
  }

  function validateForm() {
    let isValid = true;

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (nameValue.length === 0) {
      setError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (emailValue.length === 0) {
      setError(emailInput, 'Please enter your email.');
      isValid = false;
    } else if (!isEmailValid(emailValue)) {
      setError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    return isValid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = '';

    if (validateForm()) {
      formStatus.textContent = 'Thanks! Your message has been submitted.';
      form.reset();
      clearError(nameInput);
      clearError(emailInput);
      setTimeout(() => { formStatus.textContent = ''; }, 4000);
    }
  });

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0) {
      clearError(nameInput);
    }
  });

  emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim();
    if (value.length === 0) {
      // leave it to submit to show a message, but remove red state while typing
      emailInput.removeAttribute('aria-invalid');
      const errorEl = document.getElementById('email-error');
      if (errorEl) errorEl.textContent = '';
    } else if (isEmailValid(value)) {
      clearError(emailInput);
    }
  });

  // Simple To-Do list
  const todoInput = document.getElementById('todo-input');
  const todoAddButton = document.getElementById('todo-add');
  const todoList = document.getElementById('todo-list');

  function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo__item';

    const p = document.createElement('p');
    p.className = 'todo__text';
    p.textContent = text;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'todo__remove';
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', `Remove task: ${text}`);
    removeBtn.textContent = '×';

    li.appendChild(p);
    li.appendChild(removeBtn);
    return li;
  }

  function addTodo() {
    const raw = todoInput.value.trim();
    if (raw.length === 0) return;
    const item = createTodoItem(raw);
    todoList.appendChild(item);
    todoInput.value = '';
    todoInput.focus();
  }

  todoAddButton.addEventListener('click', addTodo);

  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo();
    }
  });

  todoList.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('todo__remove')) {
      const li = target.closest('li');
      if (li) li.remove();
    }
  });
});


