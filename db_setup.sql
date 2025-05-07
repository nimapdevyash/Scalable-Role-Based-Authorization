
-- NOTE: the id's may chage depending on the database condition but overall syntax remains the same

-- select * from "public"."Entities" ;
-- select * from "public"."Permissions" ;
-- select * from "public"."RolesPermissions" ;
-- select * from "public"."Roles" ;
-- select * from "public"."Users" ;

-- we have only two entities as of now, user and auth
insert into "public"."Entities" ("name" , "createdAt" , "updatedAt")
values ('user' , now() , now());

-- create permissions for each path of both entities
insert into "public"."Permissions" ("method" , "path" , "entity" , "createdAt" , "updatedAt")
values  ('post' , '/api/user/' , 1 , now() , now()), -- create user
		('get' , '/api/user/' , 1 , now() , now()), -- get all users
		('put' , '/api/user/:userName' , 1 , now() , now()), -- update user
		('delete' , '/api/user/:userName' , 1 , now() , now()), -- delete user
		('get' , '/api/user/:userName' , 1 , now() , now()); -- get user by userName
		

-- we have only two roles, Developer and Manager
insert into "public"."Roles" ("name" , "createdAt" , "updatedAt")
values	('Manager' , now() , now()),
		('Developer' , now() , now());

-- assign permissions to the roles
insert into "public"."RolesPermissions" ("role" , "permission" , "createdAt" , "updatedAt")
values  (1 , 1 , now() , now()), -- manager can create user
		(1 , 2 , now() , now()), -- manager can get all users
		(1 , 3 , now() , now()), -- manager can update a user
		(1 , 4 , now() , now()), -- manager can delete a user
		(1 , 5 , now() , now()), -- manager can get a user by it's userName
		(2 , 1 , now() , now()), -- Developer can create user
		(2 , 3 , now() , now()); -- Developer can update a user

