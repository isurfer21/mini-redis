#!/usr/bin/bash
echo "PING"
curl -X GET http://localhost:8080/ping
echo
echo "SET foo 'bar'"
curl -X POST -d 'value=bar' http://localhost:8080/set/foo
echo
echo "GET foo"
curl -X GET http://localhost:8080/get/foo
echo
echo "DEL foo"
curl -X GET http://localhost:8080/del/foo
