var mongoose = require('mongoose');

const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  let isAlive = !!this.date_of_death;
  let lifespan = isAlive ?  (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString() : 
      `${this.date_of_birth.getFullYear().toString()} - Still alive`
  return lifespan;
});

// Virtual for author's birth date
AuthorSchema
  .virtual('birthDate')
  .get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '-';
  });

// Virtual for author's death date
AuthorSchema
  .virtual('deathDate')
  .get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '-';
  });


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);