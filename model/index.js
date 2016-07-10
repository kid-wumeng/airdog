import _ from 'lodash'
import Schema from './Schema'
import store from '../store'

export default {
  dict: {},

  init(){
    let User = require('./User')
    let Post = require('./Post')
    User.$schema = new Schema(User.schema)
    Post.$schema = new Schema(Post.schema)
    User.$table = store.database('orz-world').table('User')
    Post.$table = store.database('orz-world').table('Post')
    this.dict.User = User
    this.dict.Post = Post
  }
}
