# Instant Doctor Visit App
Prouct Studio - Cornell Fall 2016


curl -X GET  http://localhost:3000/get_user?user_id=1
curl -X GET  http://localhost:3000/get_user?email_address=chen@cornell.edu


curl -H "Content-Type: application/json" -X POST -d '{"email_address":"123@321.edu","insurance_name":"Aetna","insurance_number":247315917,"group_number":398742,"first_name":"Chen","last_name":"Zhang","in_appointment_with":1}' http://localhost:3000/create_user

curl -H "Content-Type: application/json" -X POST -d '{"user_id":1,"doctor_id":2}' http://localhost:3000/add_appointment

#NONTRIVIAL:defintely put quotes for http curl, otherwise only one single query parameter, so stupid
curl -X GET  "http://localhost:3000/find_doctor?user_id=1&care_type=medical&lat=0&long=0"
