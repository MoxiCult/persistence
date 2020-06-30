FROM postgres
ENV POSTGRES_PASSWORD 123
ENV POSTGRES_DB students
ENV POSTGRES_USER admin
ADD setup.sql /docker-entrypoint-initdb.d
EXPOSE 5432