FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-20-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install 

FROM openjdk:20-jdk-slim

EXPOSE 8080

COPY --from=build /ellp/target/ellp-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]