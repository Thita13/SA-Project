// Model สำหรับ ticket
class Ticket {
  constructor(id, title, description, priority, status, assigned_to, created_at, updated_at, user_id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.assigned_to = assigned_to;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id; // ผู้สร้าง ticket
  }
}

module.exports = Ticket;
