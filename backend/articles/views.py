from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_permissions(self):
        # Require authentication for create, allow read-only access for others
        if self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [p() for p in permission_classes]

    def perform_create(self, serializer):
        # Set the author to the requesting user when creating via the API
        user = getattr(self.request, 'user', None)
        if not user or not user.is_authenticated:
            # This should be prevented by permissions, but guard defensively
            raise PermissionDenied("Authentication required to create articles")
        serializer.save(author=user)
