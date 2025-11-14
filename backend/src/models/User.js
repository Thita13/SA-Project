//- Model สำหรับ user
class User {
  constructor(user_id, name, password, role, created_at) {
    this.user_id = user_id;  // map จาก id_users
    this.name = name;        // map จาก name_user
    this.password = password;
    this.role = role;
    this.created_at = created_at;
  }
}

module.exports = User;
