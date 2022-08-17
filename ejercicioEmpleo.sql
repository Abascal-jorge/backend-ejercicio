create table books(id int, title varchar(250), year int, author varchar(250));

create table reviewers(id int, name varchar(250));

create table ratings(reviewer_id int, book_id int, rating int, rating_date date);



select * from books;
select * from reviewers;
select * from ratings;

/*Mostrando calificaciones con mejor orden o vista*/
select name, title, rating, rating_date from ratings RT
inner join books T
on RT.book_id = T.id
inner join reviewers R
on RT.reviewer_id = R.id 

/*Mostrando calificaciones con el name del reviewers en ASC*/
select name, title, rating, rating_date from ratings RT
inner join books T
on RT.book_id = T.id
inner join reviewers R
on RT.reviewer_id = R.id order by R.name ASC

/*Mostrando calificaciones con el titulo del Books en ASC*/
select name, title, rating, rating_date from ratings RT
inner join books T
on RT.book_id = T.id 
inner join reviewers R
on RT.reviewer_id = R.id order by title ASC

/*Mostrando calificaciones con el rating en ASC*/
select name, title, rating, rating_date from ratings RT
inner join books T
on RT.book_id = T.id 
inner join reviewers R
on RT.reviewer_id = R.id order by rating ASC