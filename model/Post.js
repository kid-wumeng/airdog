import ActiveRecord from './ActiveRecord'

export default class Post extends ActiveRecord {
  static schema = {
    content: String
  }
}