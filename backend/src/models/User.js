//- Model สำหรับ user
class User {
  constructor(id, name_user, password, role, created_at) {
    this.id = id;
    this.name = name_user;
    this.password = password;
    this.role = role;
    this.created_at = created_at;
  }
}

module.exports = User;
