const staff = [{ "staff_id": 1, "first_name": "Mike", "last_name": "Hillyer", "address_id": 3, "email": "Mike.Hillyer@sakilastaff.com", "store_id": 1, "active": true, "username": "Mike", "password": "8cb2237d0679ca88db6464eac60da96345513964", "last_update": "2006-05-16T16:13:11.79328", "picture": "\\x89504e470d0a5a0a" },
{ "staff_id": 2, "first_name": "Jon", "last_name": "Stephens", "address_id": 4, "email": "Jon.Stephens@sakilastaff.com", "store_id": 2, "active": true, "username": "Jon", "password": "8cb2237d0679ca88db6464eac60da96345513964", "last_update": "2006-05-16T16:13:11.79328", "picture": null }]
const store = [{ "store_id": 1, "manager_staff_id": 1, "address_id": 1, "last_update": "2006-02-15T09:57:12" },
{ "store_id": 2, "manager_staff_id": 2, "address_id": 2, "last_update": "2006-02-15T09:57:12" }]

module.exports = {
  staff,
  store
}