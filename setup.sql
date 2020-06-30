
DROP TABLE IF EXISTS students;

create table students( 
        id serial PRIMARY KEY, 
        fname VARCHAR(100) not NULL, 
        lname VARCHAR(100) not NULL);

create table grades ( 
        id serial primary key, 
        assignment varchar(100) not null, 
        grade integer not null, 
        student_id integer not null REFERENCES students(id));