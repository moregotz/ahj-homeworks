/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor(baseUrl = 'http://localhost:7070') {
    this.baseUrl = baseUrl;
  }

  _request(method, params = '', data = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${this.baseUrl}?method=${method}${params}`;

      xhr.open(data ? 'POST' : 'GET', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            resolve(response);
          } catch (e) {
            resolve(null);
          }
        } else {
          reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => reject(new Error('Network error')));

      if (data) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  }

  async list(callback) {
    try {
      const tickets = await this._request('allTickets');
      callback(null, tickets);
    } catch (error) {
      callback(error);
    }
  }

  async get(id, callback) {
    try {
      const ticket = await this._request('ticketById', `&id=${id}`);
      callback(null, ticket);
    } catch (error) {
      callback(error);
    }
  }

  async create(data, callback) {
    try {
      const ticket = await this._request('createTicket', '', data);
      callback(null, ticket);
    } catch (error) {
      callback(error);
    }
  }

  async update(id, data, callback) {
    try {
      const ticket = await this._request('updateById', `&id=${id}`, data);
      callback(null, ticket);
    } catch (error) {
      callback(error);
    }
  }

  async delete(id, callback) {
    try {
      await this._request('deleteById', `&id=${id}`);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}
