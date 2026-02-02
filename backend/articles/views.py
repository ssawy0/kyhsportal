from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_permissions(self):
        # For create we allow the request through so `perform_create` can
        # return a friendly PermissionDenied message for anonymous users.
        # For other actions enforce normal IsAuthenticatedOrReadOnly.
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [p() for p in permission_classes]

    def perform_create(self, serializer):
        # Only authenticated users may create articles. If an unauthenticated
        # request slips through, raise a clear PermissionDenied message.
        user = getattr(self.request, 'user', None)
        if not user or not user.is_authenticated:
            raise PermissionDenied("Sorry, only registered users may post an Article")
        serializer.save(author=user)
