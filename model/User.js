import ActiveRecord from './ActiveRecord'

export default class User extends ActiveRecord {
  static schema = {
    name: String,
    posts: [{
      $ref: 'Post'
    }]
  }
}