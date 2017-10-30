var mongoose = require('mongoose');

//module.exports = mongoose.model('LabName', {
//	text : {type : String, default: ''}
//});

var Schema = mongoose.Schema;

// create a schema
var clockSchema = new Schema({
  product_name: String,
  serial_number: String,
  service_pid: String,
  impact_status: String,
  entitled_status: String,
  license_status: String,
  months_since_original_ship: String,
  name: String,
  email_address: String,
  ship_to_company: String,
  address1: String,
  address2: String,
  city: String,
  state_province: String,
  postal_code: String,
  country: String,
  theatre: String,
  first_name: String,
  last_name: String,
  phone: String,
  fax: String,
  email: String,
  notes: String,
  order_priority_date: String,
  order_type: String,
  omc: String,
  edcs: String,
  order_number: String,
  return_rma: String,
  order_process_status: String,
  fix_on_fail_status: String,
  duplicate_status: String
}, { collection: 'ClockMod' });

// the schema is useless so far
// we need to create a model using it
var ClockMod = mongoose.model('ClockMod', clockSchema);

// make this available to our users in our Node applications
module.exports = ClockMod;