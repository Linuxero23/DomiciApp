export default class Restaurant {
  constructor(id, owner_id, name, description, address, category, created_at) {
    this.id = id;
    this.owner_id = owner_id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.category = category;
    this.created_at = created_at;
  }
}
    