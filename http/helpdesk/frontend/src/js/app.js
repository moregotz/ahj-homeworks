import HelpDesk from './HelpDesk.js';
import TicketService from './TicketService.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const ticketService = new TicketService('http://localhost:7070');
    const app = new HelpDesk(root, ticketService);
    app.init();
});
