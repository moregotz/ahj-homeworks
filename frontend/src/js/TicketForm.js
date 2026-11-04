/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    this.modal = this._createModal();
  }

  _createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'none';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const form = document.createElement('form');
    form.className = 'ticket-form';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'Краткое описание';
    nameInput.required = true;

    const descTextarea = document.createElement('textarea');
    descTextarea.name = 'description';
    descTextarea.placeholder = 'Полное описание';

    const buttons = document.createElement('div');
    buttons.className = 'modal-buttons';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Сохранить';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Отмена';

    buttons.appendChild(submitBtn);
    buttons.appendChild(cancelBtn);

    form.appendChild(nameInput);
    form.appendChild(descTextarea);
    form.appendChild(buttons);
    content.appendChild(form);
    modal.appendChild(content);

    cancelBtn.addEventListener('click', () => this.hide());

    return modal;
  }

  show(ticket = null, onSubmit) {
    const form = this.modal.querySelector('form');
    const nameInput = form.querySelector('[name="name"]');
    const descTextarea = form.querySelector('[name="description"]');

    if (ticket) {
      nameInput.value = ticket.name;
      descTextarea.value = ticket.description;
    } else {
      form.reset();
    }

    form.onsubmit = (e) => {
      e.preventDefault();
      const data = {
        name: nameInput.value,
        description: descTextarea.value,
        status: ticket ? ticket.status : false
      };
      onSubmit(data);
      this.hide();
    };

    this.modal.style.display = 'flex';
  }

  hide() {
    this.modal.style.display = 'none';
  }

  getElement() {
    return this.modal;
  }
}
