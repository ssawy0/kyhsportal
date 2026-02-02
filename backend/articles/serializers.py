from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # expose only minimal public fields
        fields = ('id', 'username')


class ArticleSerializer(serializers.ModelSerializer):
    # nest author details as read-only
    author = UserSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
