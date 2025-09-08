export default class User {
  constructor(id, name, email, password, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role; // 'Cliente', 'Restaurante', 'Entregador' o null
  }
}
