# boreal-nodev1
REST Provider for MySQL, MariaDB and Amazon Aurora servers running in containers! 

![Aurora](http://i.imgur.com/XdRQN3k.jpg)


# Select 

## Select Fields 

```
http://localhost:1337/v1/table?_fields=id:name:age

Query: 

select `id`, `name`, `age` from `table`
```

## Where Fields 

```
http://localhost:1337/v1/table?_fields=id:name:age&_where=id=12

Query:

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
    localhost:1337/v1/table
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
    -d '{ "data": {"name":"Matheus Fidelis", "age":21}, "where":"id = 12 and user = `Matheus`"}' \
    localhost:1337/v1/table
```

### Output Query

```sql
update `table` set `age` = 21, `name` = 'Matheus Fidelis' where id = 12 and user = `Matheus`
```


# DELETE

```bash
curl -X DELETE \
    -H "Content-type: Application/json" \
    -d '{"where":"id = 12 and user = `Matheus`"}' \
    localhost:1337/v1/table
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

