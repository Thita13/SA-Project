// Model สำหรับ comment
class Comment {
  constructor(id, message, ticket_id, user_id, created_at) {
    this.id = id;
    this.message = message;
    this.ticket_id = ticket_id;
    this.user_id = user_id;
    this.created_at = created_at;
  }
}

module.exports = Comment;
