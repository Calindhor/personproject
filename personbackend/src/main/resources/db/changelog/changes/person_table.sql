create table person (
  id serial not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  address varchar(255) not null,
  primary key (id)
);
