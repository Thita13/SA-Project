import api from './api';

const getTickets = async () => {
  const res = await api.get('/tickets');
  return res.data;
};

const getTicket = async (id) => {
  const res = await api.get(`/tickets/${id}`);
  return res.data;
};

const createTicket = async (ticketObj) => {
  // ticketObj may contain attachment (File) and other keys
  const form = new FormData();
  Object.keys(ticketObj).forEach((k) => {
    if (ticketObj[k] !== undefined && ticketObj[k] !== null) {
      form.append(k, ticketObj[k]);
    }
  });

  const res = await api.post('/tickets', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const addComment = async (ticketId, commentObj) => {
  const res = await api.post(`/tickets/${ticketId}/comments`, commentObj);
  return res.data;
};

const deleteTicket = async (ticketId) => {
  const res = await api.delete(`/tickets/${ticketId}`);
  return res.data;
};

export default {
  getTickets,
  getTicket,
  createTicket,
  addComment,
  deleteTicket,
};
