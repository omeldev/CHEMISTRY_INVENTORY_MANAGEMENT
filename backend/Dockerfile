FROM maven:3-eclipse-temurin-23-alpine AS build

COPY . /app/backend

WORKDIR /app/backend
ENV SPRING_PROFILES_ACTIVE=prod
RUN mvn package

FROM eclipse-temurin:23 AS prod
ENV SPRING_PROFILES_ACTIVE=prod
COPY --from=build /app/backend/target/backend.jar /app/backend/backend.jar

WORKDIR /app/backend

CMD ["java", "-jar", "./backend.jar"]
