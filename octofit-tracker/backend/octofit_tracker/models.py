from djongo import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.JSONField()
    def __str__(self):
        return self.name

class Activity(models.Model):
    user = models.EmailField()
    type = models.CharField(max_length=50)
    distance = models.IntegerField()
    def __str__(self):
        return f"{self.user} - {self.type}"

class Leaderboard(models.Model):
    team = models.CharField(max_length=50)
    points = models.IntegerField()
    def __str__(self):
        return self.team

class Workout(models.Model):
    user = models.EmailField()
    workout = models.CharField(max_length=50)
    reps = models.IntegerField()
    def __str__(self):
        return f"{self.user} - {self.workout}"