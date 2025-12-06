FROM maven:3-eclipse-temurin-23-alpine AS build

COPY . /app/

WORKDIR /app
ENV SPRING_PROFILES_ACTIVE=prod
RUN mvn package

FROM eclipse-temurin:23 AS prod
ENV SPRING_PROFILES_ACTIVE=prod
COPY --from=build /app/WebApp/target/WebApp-1.0-SNAPSHOT.jar /app/WebApp-1.0-SNAPSHOT.jar

WORKDIR /app

CMD ["java", "-jar", "./WebApp-1.0-SNAPSHOT.jar"]
