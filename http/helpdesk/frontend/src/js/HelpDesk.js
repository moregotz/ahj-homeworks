/**
 *  Основной класс приложения
 * */
import TicketView from './TicketView';
import TicketForm from './TicketForm';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('not HTML element');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.form = new TicketForm();
  }

  init() {
    this._renderLayout();
    this._bindEvents();
    this._loadTickets();
  }

  _renderLayout() {
    this.container.innerHTML = `
      <div class="helpdesk">
        <div class="helpdesk-header">
          <h1 class="helpdesk-title">HelpDesk</h1>
          <button class="add-ticket-btn">Добавить тикет</button>
        </div>
        <div class="ticket-list"></div>
      </div>
    `;
    this.container.appendChild(this.form.getElement());
    this.ticketListEl = this.container.querySelector('.ticket-list');
    this.addTicketBtn = this.container.querySelector('.add-ticket-btn');
  }

  _bindEvents() {
    this.addTicketBtn.addEventListener('click', () => {
      this.form.show(null, (data) => this._createTicket(data));
    });
  }

  _loadTickets() {
    this.ticketService.list((error, tickets) => {
      if (error) {
        console.error('Ошибка загрузки тикетов, ', error);
        return;
      }
      TicketView.renderTickets(this.ticketListEl, tickets, {
        onStatusChange: (id, status) => this._updateTicketStatus(id, status),
        onTicketClick: (id) => this._showTicketDetails(id),
        onEdit: (id) => this._editTicket(id),
        onDelete: (id) => this._deleteTicket(id)
      });
    });
  }

  _createTicket(data) {
    this.ticketService.create(data, (error) => {
      if (error) {
        console.error('Ошибка создания тикета, ', error);
        return;
      }
      this._loadTickets();
    });
  }

  _updateTicketStatus(id, status) {
    this.ticketService.get(id, (error, ticket) => {
      if (error) return;
      ticket.status = status;
      this.ticketService.update(id, ticket, (error) => {
        if (error) {
          console.error('Ошибка обновления статуса тикета, ', error);
          return;
        }
        this._loadTickets();
      });
    });
  }

  _showTicketDetails(id) {
    this.ticketService.get(id, (error, ticket) => {
      if (error) {
        console.error('Ошибка тикета, ', error);
        return;
      }
      alert(`Описание: ${ticket.description}`);
    });
  }

  _editTicket(id) {
    this.ticketService.get(id, (error, ticket) => {
      if (error) {
        console.error('Ошибка тикета,', error);
        return;
      }
      this.form.show(ticket, (data) => {
        this.ticketService.update(id, data, (error) => {
          if (error) {
            console.error('Ошибка редактирования тикета, ', error);
            return;
          }
          this._loadTickets();
        });
      });
    });
  }

  _deleteTicket(id) {
    if (confirm('Удалить тикет?')) {
      this.ticketService.delete(id, (error) => {
        if (error) {
          console.error('Ошибка удаления тикета, ', error);
          return;
        }
        this._loadTickets();
      });
    }
  }
}
