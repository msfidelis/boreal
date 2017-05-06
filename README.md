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

Query:

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