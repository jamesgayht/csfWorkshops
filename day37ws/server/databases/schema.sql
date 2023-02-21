create database feeds; 

use feeds; 

create table posts (
    post_id varchar(8) primary key, 
    comments mediumtext, 
    picture mediumblob
);