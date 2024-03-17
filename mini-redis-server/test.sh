#!/usr/bin/bash
echo "PING"
curl -X GET http://localhost:8080/ping
echo
echo "GET foo"
curl -X GET "http://localhost:8080/get?key=%2Bfoo\r\n"
echo
echo "SET foo 'bar'"
curl -X POST -d 'key=%2Bfoo\r\n&value=%2411\r\nhello%20world\r\n' http://localhost:8080/set
echo
echo "GET foo"
curl -X GET "http://localhost:8080/get?key=%2Bfoo\r\n"
echo
echo "DEL foo"
curl -X DELETE "http://localhost:8080/del?key=%2Bfoo\r\n"
echo
echo "GET foo"
curl -X GET "http://localhost:8080/get?key=%2Bfoo\r\n"
echo
echo "SET foo ''"
curl -X POST -d 'key=%2Bfoo\r\n&value=%2B\r\n' http://localhost:8080/set
echo
echo "GET foo"
curl -X GET "http://localhost:8080/get?key=%2Bfoo\r\n"
echo
exit
