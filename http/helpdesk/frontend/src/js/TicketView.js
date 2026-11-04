/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  static createTicketElement(ticket, callbacks) {
    const el = document.createElement('div');
    el.className = 'ticket';
    el.dataset.id = ticket.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = ticket.status;
    checkbox.addEventListener('change', () => callbacks.onStatusChange(ticket.id, checkbox.checked));

    const name = document.createElement('span');
    name.className = 'ticket-name';
    name.textContent = ticket.name;
    name.addEventListener('click', () => callbacks.onTicketClick(ticket.id));

    const date = document.createElement('span');
    date.className = 'ticket-date';
    date.textContent = new Date(ticket.created).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '✎';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      callbacks.onEdit(ticket.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      callbacks.onDelete(ticket.id);
    });

    el.appendChild(checkbox);
    el.appendChild(name);
    el.appendChild(date);
    el.appendChild(editBtn);
    el.appendChild(deleteBtn);

    return el;
  }

  static renderTickets(container, tickets, callbacks) {
    container.innerHTML = '';
    tickets.forEach(ticket => {
      const el = TicketView.createTicketElement(ticket, callbacks);
      container.appendChild(el);
    });
  }
}
