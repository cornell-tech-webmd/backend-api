# Instant Doctor Visit App
Prouct Studio - Cornell Fall 2016


curl -X GET  http://localhost:3000/get_user?user_id=999
curl -H "Content-Type: application/json" -X POST -d '{"user_id":999,"insurance_name":"Aetna","insurance_number":247315917,"group_number":398742,"first_name":"Chen","last_name":"Zhang","in_appointment_with":1}' http://localhost:3000/create_user
