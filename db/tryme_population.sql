insert into category(id, name, sexen) values (10, 'bodies', 'f');
insert into category(id, name, sexen) values (11, 'summer', 'f');
insert into category(id, name, sexen) values (12, 'croptop', 'f');
insert into category(id, name, sexen) values (13, 'dress', 'f');
insert into category(id, name, sexen) values (14, 'pregnant', 'f');
insert into category(id, name, sexen) values (15, 'shirt', 'd');
insert into category(id, name, sexen) values (16, 'shirt', 'f');
insert into category(id, name, sexen) values (17, 'shirt long', 'f');
insert into category(id, name, sexen) values (18, 'sport', 'f');
insert into category(id, name, sexen) values (19, 'top', 'f');

insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    100,
    'Dane Doe',
    'Blouse Black',
    29.99,
    'Black Blouse. Looks black.',
    11,
    '03-06-2021',
    'Summer'
 );

insert into product_images(product_id, img_path, model, view)
values (
    100,
    'ausschnitt.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    101,
    'Dane Doe',
    'Top Black',
    18.99,
    'Top Blouse. Looks black and Toppy.',
    11,
    '03-06-2021',
    'Summer'
 );

insert into product_images(product_id, img_path, model, view)
values (
    101,
    'ausschnitt2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    102,
    'è le gancé',
    'Body',
    25.99,
    'Grey/Olive Body for Women',
    10,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    102,
    'body.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    103,
    'è le gancé',
    'Body',
    35.99,
    'Black Body for Women',
    10,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    103,
    'body2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    104,
    'Sheriff Shorty',
    'Croptop',
    12.99,
    'Gray Croptop for Women',
    12,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    104,
    'croptop.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    105,
    'Sheriff Shorty',
    'Croptop',
    15.99,
    'Black Croptop for Women with long sleeves. Shoulder-free.',
    12,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    105,
    'croptop2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    106,
    'Sheriff Shorty',
    'Croptop',
    13.99,
    'Green Croptop for Women with long sleeves',
    12,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    106,
    'croptop3.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    107,
    'Sheriff Shorty',
    'Croptop',
    13.99,
    'Grey Croptop for Women',
    12,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    107,
    'croptop4.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    130,
    'T´shannel',
    'Dress',
    131.99,
    'White Dress-Shirt.',
    13,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    130,
    'dress.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    108,
    'T´shannel',
    'Dress',
    64.99,
    'White Stripey Dress-Shirt.',
    13,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    108,
    'dress2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    109,
    'T´shannel',
    'Pregnancy Top',
    23.99,
    'Gray Tent',
    14,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    109,
    'preg.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    110,
    'T´shannel',
    'Pregnancy Top',
    31.99,
    'Blue Fancy Tent',
    14,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    110,
    'preg2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    111,
    'Levi´s',
    'T-Shirt',
    34.99,
    'Levi´s T-Shirt from Levi´s.',
    15,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    111,
    'shirt.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    112,
    'ACDC',
    'T-Shirt',
    34.99,
    'ACDC T-Shirt',
    15,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    112,
    'shirt1.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    113,
    'Marco',
    'Polo-Shirt',
    34.99,
    'Polo T-Shirt',
    15,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    113,
    'shirt2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    114,
    'Flowér de Blǘme',
    'Blousy Shirty Thingy',
    34.99,
    'Blousy Shirty Thingy',
    16,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    114,
    'shirt3.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    115,
    'Schlicht in Sicht',
    'White T-Shirt',
    34.99,
    'Just a White T-Shirt',
    16,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    115,
    'shirt4.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    116,
    'Reebok',
    'Classic T-Shirt',
    34.99,
    'Classic T-Shirt Blue',
    15,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    116,
    'shirt5.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    117,
    'Hilfiger',
    'Denim T-Shirt',
    34.99,
    'Denim T-Shirt Blue',
    16,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    117,
    'shirt6.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    118,
    'The North Face',
    'Grey T-Shirt',
    34.99,
    'Grey T-Shirt',
    15,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    118,
    'shirt7.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    119,
    'Hipster',
    'Authentic T-Shirt',
    34.99,
    'Red Authentic T-Shirt',
    15,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    119,
    'shirt8.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    120,
    'Flowér de Blǘme',
    'Yellow Wrinkle T-Shirt',
    34.99,
    'Yellow Wrinkle T-Shirt',
    16,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    120,
    'shirt9.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    121,
    'Flowér de Blǘme',
    'Red Long-Sleeve T-Shirt',
    34.99,
    'Red Long-Sleeve T-Shirt',
    17,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    121,
    'shirt_long.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    122,
    'Guess',
    'White T-Shirt',
    34.99,
    'White Unknown T-Shirt. I guess... You have to guess...',
    17,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    122,
    'shirt_long2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    123,
    'Flowér de Blǘme',
    'Blue Long-Sleeve T-Shirt',
    34.99,
    'Blue Long-Sleeve T-Shirt... With Long Sleeves... And in Blue...',
    17,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    123,
    'shirt_long3.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    124,
    'Flowér de Blǘme',
    'Blue Flowery Long-Sleeve T-Shirt',
    34.99,
    'Blue Flowery Long-Sleeve T-Shirt... With Long Sleeves... And in Blue... And Flowery...',
    17,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    124,
    'shirt_long4.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    125,
    'è le gancé',
    'Black Long-Sleeve Shirt',
    34.99,
    'Black Long-Sleeve Shirt',
    17,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    125,
    'shirt_long5.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    126,
    'è le gancé',
    'Sport Shirt',
    34.99,
    'Sport Shirt With Blue Inside',
    18,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    126,
    'sport.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    127,
    'è le gancé',
    'Pink Top',
    34.99,
    'Pink No-Sleeve Shirt',
    19,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    127,
    'top.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    128,
    'True',
    'Boolean Top',
    34.99,
    'Boolean Top. It´s not always black and white. Sometimes its True or False as well...',
    19,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    128,
    'top2.jpg',
    false,
    0
);
-->>>>>>>>>>>
insert into product(id, manufacturer, name, price, "desc", category, date, season)
values(
    129,
    'è le gancé',
    'Blue Top',
    34.99,
    'Blue Top',
    19,
    '03-06-2021',
    'Summer'
);

insert into product_images(product_id, img_path, model, view)
values (
    129,
    'top3.jpg',
    false,
    0
);
