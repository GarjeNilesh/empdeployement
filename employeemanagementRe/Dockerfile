# ---- Build stage ----
FROM eclipse-temurin:26-jdk-alpine AS build
WORKDIR /app

# Copy Gradle wrapper and build files first (better layer caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Copy source code
COPY src src

# Make gradlew executable and build the jar (skip tests for faster image builds)
RUN chmod +x gradlew && ./gradlew clean build -x test

# ---- Run stage ----
FROM eclipse-temurin:26-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]