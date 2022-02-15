const { Schema, model, Types } = require('mongoose')

const snackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Chocolate', 'Cooked Food', 'Popcorn', 'Gummies', 'Hard Candies', 'Cookies']
  },
  snackerId: {
    type:Types.ObjectId,
    ref: "User"
  }
})

const Snack = model("Snack", snackSchema);

module.exports = Snack;