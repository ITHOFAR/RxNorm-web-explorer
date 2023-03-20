# Concerns over Final Project

## How graders will access project

Currently I have implemented PostgreSQL on CIMS (see cims-readme in db). I have also implemented PostgreSQL (and this project) within a docker container.

### Current Concern

How will the graders try to run my code on CIMS? Due to how PostgreSQL is set up, they would most likely need to log into CIMS as me (ith5263) due to how we are required to set up postgres by courant. \
Or, could the graders just use my docker image if possible? \
Currently, my project uses about 1.5GB of data from RxNorm. However, this data requires a free acount with the National Library of Medicine and takes time to be approved. I currently have a copy of the data on CIMS in my project folder, but if the graders want to use docker, I would need to provide them the data.

## Additional Concerns

### PostgreSQL as a research topic

Small concern. Would using PostgreSQL with a full schema be considered a research topic?

### Complexity of querys

Currently, I have some rather complex querys in the schema to pull together data using JSON_aggregation. However, this would lead to my middle-tier JS querys being pretty lackluster and simple. For showcasing of JS knowledge/credit for work, would it be okay to use these advanced sql querys?

### PostgreSQL backed authentication

Are we supposed to implement our own authentication system. Or can we use something like passport with Postgres storing info?
