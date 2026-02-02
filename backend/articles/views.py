from rest_framework import viewsets, permissions
from .models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        # Set the author to the requesting user when creating via the API
        user = getattr(self.request, 'user', None)
        if user and user.is_authenticated:
            serializer.save(author=user)
        else:
            # allow creation without author if unauthenticated (keeps behavior)
            serializer.save()
