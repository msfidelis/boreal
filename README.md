# boreal-nodev1
REST Provider for MySQL, MariaDB and Amazon Aurora servers running in containers! 

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
http://localhost:1337/v1/table?_fields=id:name:age
```

### Output Query: 

```sql
select `id`, `name`, `age` from `table`
```

## Where Fields 

```
http://localhost:1337/v1/table?_fields=id:name:age&_where=id=12
```

### Output Query:

```sql
select `id`, `name`, `age` from `table` where id = 12
```

```
http://localhost:1337/v1/table?_fields=id:name:age&_where=id=12 AND age > 12 OR NAME = 'matheus'
```

### Query Output:

```sql
select `id`, `name`, `age` from `table` where id = 12
```


# INSERT

### Request POST 

```bash
$ curl -X POST \
    -H "Content-type: Application/json" \
    -d '{"name":"Matheus Fidelis", "age":21}' \
    localhost:1337/v1/users
```
### Output Query

```sql
insert into `table` (`age`, `name`) values (21, 'Matheus Fidelis')
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
update `table` set `age` = 21, `name` = 'Matheus Fidelis' where id = 12 and user = `Matheus`
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
delete from `table` where id = 12 and user = `Matheus`
```

# Raw Query

```bash
$ curl -X POST \
    -H "Content-type: Application/json" \
    -d '{"query":"SELECT CONCAT_WS(`,`,`First name`,`Second name`,`Last Name`"}' \
    localhost:1337/v1/table
```

### Output Query
```sql
SELECT CONCAT_WS(`,`,`First name`,`Second name`,`Last Name`
```


