select * from "public"."Entities" ;
select * from "public"."Permissions" ;
select * from "public"."RolesPermissions" ;
select * from "public"."Roles" ;


insert into "public"."Entities" ("name" , "createdAt" , "updatedAt")
values ('user' , now() , now());

insert into "public"."Permissions" ("method" , "path" , "entity" , "createdAt" , "updatedAt")
values ('post' , 'api/' , 2 , now() , now()) ;

insert into "public"."Roles" ("name" , "createdAt" , "updatedAt")
values ('Admin' , now() , now()) ;


insert into "public"."RolesPermissions" ("role" , "permission" , "createdAt" , "updatedAt")
values (1 , 2 , now() , now()) ;