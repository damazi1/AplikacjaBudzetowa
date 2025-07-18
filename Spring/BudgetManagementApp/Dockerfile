# Etap 1: budowanie aplikacji
FROM maven:3.9.10-eclipse-temurin-21
WORKDIR /app
COPY pom.xml .
COPY src ./src
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]