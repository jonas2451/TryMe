drop table if exists "user" cascade;
drop table if exists user_images cascade;
drop table if exists "category" cascade;
drop table if exists product cascade;
drop table if exists product_images cascade;
drop table if exists inventory cascade;

create table "user"(
    email       varchar     primary key,
    password    varchar     not null,
    first_name  varchar     not null,
    last_name   varchar     not null,
    birthday    date        not null,
    commercial bool         not null
);

create table user_images(
    id          serial,
    user_id     varchar,
    image_path  varchar     not null,
    PRIMARY KEY(id, user_id),
    constraint user_images_fk_user foreign key (user_id) references "user" (email) on delete cascade
);

create table category(
    id          serial      primary key,
    name        varchar     not null,
    sexen       char        not null
);

create table product(
    id          serial      primary key,
    manufacturer varchar    not null,
    name        varchar     not null,
    price       float       not null,
    "desc"        varchar   not null,
    category    int         not null,
    constraint product_fk_category foreign key (category) references category (id) on delete cascade,
    date        date        not null,
    season      varchar     not null
);

create table product_images(
    id          serial,
    product_id  int         not null,
    constraint product_images_fk_product foreign key (product_id) references product (id) on delete cascade,
    PRIMARY KEY(id, product_id),
    img_path    varchar     not null,
    model       bool        not null,
    view        int         not null
);

create table inventory(
    product_id  int         not null,
    constraint inventory_fk_product foreign key (product_id) references product (id) on delete cascade,
    size        char        not null,
    PRIMARY KEY(product_id, size),
    quantity    int         not null
);

create table loginToken(
    token       varchar     primary key,
    user_id     varchar     not null,
    constraint loginToken_fk_user foreign key (user_id) references "user" (email) on delete cascade,
    timestamp   timestamp   not null
);

create or replace function login (email_param "user".email%type, password_param "user".password%type)
returns varchar as $gen_token$
declare
exists boolean DEFAULT False;
gen_token loginToken.token%type;

begin
    SELECT EXISTS(select 1 from "user" u where u.email=email_param AND u.password=password_param into exists);

if exists then
    insert into loginToken(token, user_id, timestamp)values(uuid_generate_v1(), email_param, CURRENT_TIMESTAMP) RETURNING token into gen_token;
    return gen_token;
else
    raise exception 'Invalid user or password!';
end if;
end; $gen_token$ language plpgsql;