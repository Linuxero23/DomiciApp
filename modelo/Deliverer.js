export default class Deliverer {
  constructor(id, user_id, is_available = true, rating = 0) {
    this.id = id;
    this.user_id = user_id;
    this.is_available = is_available;
    this.rating = rating;
  }
}

