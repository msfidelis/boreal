# boreal-nodev1
REST Provider for MySQL, MariaDB and Amazon Aurora servers running in containers! 

[![Build Status](https://secure.travis-ci.org/msfidelis/boreal.png?branch=master)](http://travis-ci.org/msfidelis/boreal) [![Code Climate](https://codeclimate.com/github/msfidelis/boreal/badges/gpa.svg)](https://codeclimate.com/github/msfidelis/boreal)

![Aurora](http://i.imgur.com/XdRQN3k.jpg)


# RUN 

## RESTfy a simple server

``` bash
$ docker run -e MYSQL_MASTER_SERVER=http://master.rds.com.br \
	-e MYSQL_MASTER_USER=root \
	-e MYSQL_MASTER_PASS=pass \
	-e MYSQL_MASTER_SCHEMA=payments \
    -e MYSQL_MASTER_PORT=3306 \
	msfidelis/boreal
```

## RESTfy a master and read server 

``` bash
$ docker run -e MYSQL_MASTER_SERVER=http://master.rds.com.br \
	-e MYSQL_MASTER_USER=root \
	-e MYSQL_MASTER_PASS=pass \
	-e MYSQL_MASTER_SCHEMA=payments \
    -e MYSQL_MASTER_PORT=3306 \
    -e MYSQL_READ_SERVER=http://read.rds.com.br \
	-e MYSQL_READ_USER=root \
	-e MYSQL_READ_PASS=pass \
	-e MYSQL_READ_SCHEMA=payments_replica \
    -e MYSQL_READ_PORT=3306 \
	msfidelis/boreal
```

## RESTFy a mysql server and Memcached Server

``` bash
$ docker run -e MYSQL_MASTER_SERVER=http://master.rds.com.br \
	-e MYSQL_MASTER_USER=root \
	-e MYSQL_MASTER_PASS=pass \
	-e MYSQL_MASTER_SCHEMA=payments \
    -e MYSQL_MASTER_PORT=3306 \
    -e MEMCACHED_SERVER=http://memcached.com.br \
    -e MEMCACHED_PORT=11211 \
	msfidelis/boreal
```

## RESTFy a mysql server and Redis Server

``` bash
$ docker run -e MYSQL_MASTER_SERVER=http://master.rds.com.br \
	-e MYSQL_MASTER_USER=root \
	-e MYSQL_MASTER_PASS=pass \
	-e MYSQL_MASTER_SCHEMA=payments \
    -e MYSQL_MASTER_PORT=3306 \
    -e REDIS_SERVER=http://redis.com.br \
    -e REDIS_PORT=6379 \
	msfidelis/boreal
```



# SELECT

## Select Fields 

```bash
http://localhost:1337/v1/users?_fields=id:name:age
```

### Output Query: 

```sql
select `id`, `name`, `age` from `users`
```

## Where Fields 

```
http://localhost:1337/v1/users?_fields=id:name:age&_where=id=12
```

### Output Query:

```sql
select `id`, `name`, `age` from `users` where id = 12
```

```
http://localhost:1337/v1/users?_fields=id:name:age&_where=id=12 AND age > 12 OR NAME = 'matheus'
```

### Query Output:

```sql
select `id`, `name`, `age` from `users` where id = 12
```


# INSERT

## INSERT A SINGLE ROW

### Request POST 

```bash
$ curl -X POST \
    -H "Content-type: Application/json" \
    -d '{ "data" : {"name":"Matheus Fidelis", "age":21}}' \
    localhost:1337/v1/users
```
### Output Query

```sql
insert into `users` (`age`, `name`) values (21, 'Matheus Fidelis')
```

## INSERT BULK DATA

### Request POST

```bash
$ curl -X POST \
    -H "Content-type: Application/json" \
    -d '{ "data" : [{"name":"Matheus Fidelis", "age":21}, {"name":"Dunha", "age":30}]}' \
    localhost:1337/v1/users
```


# UPDATE

### Request PUT/PATCH 

```bash
curl -X PUT \
    -H "Content-type: Application/json" \
    -d '{ "data": {"name":"Matheus Fidelis changed", "age":21}, "where":"id = 12"}' \
    localhost:1337/v1/users
```

### Output Query

```sql
update `users` set `age` = 21, `name` = 'Matheus Fidelis' where id = 12 and user = `Matheus`
```


# DELETE

```bash
curl -X DELETE \
    -H "Content-type: Application/json" \
    -d '{"where":"id = 12 and name = `Matheus Fidelis`"}' \
    localhost:1337/v1/users
```

### Output Query

```sql 
delete from `users` where id = 12 and user = `Matheus`
```

# RAW QUERY

```bash
$ curl -X POST \
    -H "Content-type: Application/json" \
    -d '{"query":"SELECT CONCAT_WS(`,`,`First name`,`Second name`,`Last Name`"}' \
    localhost:1337/v1/users
```

### Output Query
```sql
SELECT CONCAT_WS(`,`,`First name`,`Second name`,`Last Name`
```

# ADMINISTRATIVE COMMANDS

## FLUSH TABLES

```bash
curl -X GET http://localhost:1337/v1/_FLUSHTABLES
```

### RESPONSE

```json
{
  "info": {
    "query_uuid": "6106fca4-998f-43a9-937f-c0f322846df1",
    "sql": "FLUSH TABLES",
    "affectedRows": 0
  },
  "data": [
    {
      "fieldCount": 0,
      "affectedRows": 0,
      "insertId": 0,
      "serverStatus": 2,
      "warningCount": 0,
      "message": "",
      "protocol41": true,
      "changedRows": 0
    },
    null
  ]
}
```

## RESET QUERY CACHE

```bash
$ curl -X GET http://localhost:1337/v1/_RESETQUERYCACHE
```

### Response

```json
{
  "info": {
    "query_uuid": "72b50bb8-c1c2-4d00-bf69-0257e805973c",
    "sql": "RESET QUERY CACHE",
    "affectedRows": 0
  },
  "data": [
    {
      "fieldCount": 0,
      "affectedRows": 0,
      "insertId": 0,
      "serverStatus": 2,
      "warningCount": 0,
      "message": "",
      "protocol41": true,
      "changedRows": 0
    },
    null
  ]
}
```
## FLUSH QUERY CACHE

```bash
$ curl -X GET http://localhost:1337/v1/_FLUSHQUERYCACHE
```

### RESPONSE

```json
{
  "info": {
    "query_uuid": "a1083c56-7f8b-46f9-acf6-9cdbf3ed74c8",
    "sql": "FLUSH QUERY CACHE",
    "affectedRows": 0
  },
  "data": [
    {
      "fieldCount": 0,
      "affectedRows": 0,
      "insertId": 0,
      "serverStatus": 2,
      "warningCount": 0,
      "message": "",
      "protocol41": true,
      "changedRows": 0
    },
    null
  ]
}
```
## SHOW PROCESSLIST

```bash
$ curl -X GET http://localhost:1337/v1/_PROCESSLIST
```

### RESPONSE
```json
{
  "info": {
    "query_uuid": "9dfdc45b-dfc1-4c05-9533-6a9d524e94e8",
    "sql": "SHOW PROCESSLIST"
  },
  "data": [
    [
      {
        "Id": 46,
        "User": "root",
        "Host": "172.19.0.1:48240",
        "db": "test",
        "Command": "Sleep",
        "Time": 5685,
        "State": "",
        "Info": null
      },
      {
        "Id": 47,
        "User": "root",
        "Host": "172.19.0.1:48242",
        "db": null,
        "Command": "Sleep",
        "Time": 5704,
        "State": "",
        "Info": null
      },
      {
        "Id": 322,
        "User": "root",
        "Host": "172.19.0.1:48794",
        "db": "test",
        "Command": "Sleep",
        "Time": 2080,
        "State": "",
        "Info": null
      }
    ]
    ...
}
```

## SHOW CREATE TABLE

```bash
$ curl -X GET http://localhost:1337/v1/_SHOWCREATE/{table}
```

### RESPONSE

```json
{
  "info": {
    "query_uuid": "7bf77111-f774-4cdc-89cb-46f183b7d264",
    "sql": "SHOW CREATE TABLE users"
  },
  "data": [
    [
      {
        "Table": "users",
        "Create Table": "CREATE TABLE `users` (\n  `id` int(11) NOT NULL AUTO_INCREMENT,\n  `name` varchar(50) NOT NULL,\n  `age` int(11) NOT NULL,\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1"
      }
    ]
  ]
  ...
}
```

## DESCRIBE TABLE

```
$ curl -X GET http://localhost:1337/v1/_DESCRIBE/users
```

```json
{
  "info": {
    "query_uuid": "f5f8a6ae-f9c1-4a6d-b304-15f0a3eedd05",
    "sql": "DESCRIBE users"
  },
  "data": [
    [
      {
        "Field": "id",
        "Type": "int(11)",
        "Null": "NO",
        "Key": "PRI",
        "Default": null,
        "Extra": "auto_increment"
      },
      {
        "Field": "name",
        "Type": "varchar(50)",
        "Null": "NO",
        "Key": "",
        "Default": null,
        "Extra": ""
      },
      {
        "Field": "age",
        "Type": "int(11)",
        "Null": "NO",
        "Key": "",
        "Default": null,
        "Extra": ""
      }
    ]
    ...
}
```

## SHOW TABLES

```
$ curl -X GET http://localhost:1337/v1/_SHOWTABLES
```

### RESPONSE

```json
{
  "info": {
    "query_uuid": "1b0a3fc0-81a8-4d15-8c71-d96b9ca9ebbb",
    "sql": "SHOW TABLES\t"
  },
  "data": [
    [
      {
        "Tables_in_test": "users"
      }
    ],
    [
      {
        "catalog": "def",
        "db": "information_schema",
        "table": "TABLE_NAMES",
        "orgTable": "TABLE_NAMES",
        "name": "Tables_in_test",
        "orgName": "TABLE_NAME",
        "charsetNr": 33,
        "length": 192,
        "type": 253,
        "flags": 1,
        "decimals": 0,
        "zeroFill": false,
        "protocol41": true
      }
    ]
  ]
}
```
