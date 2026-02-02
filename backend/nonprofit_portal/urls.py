from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from articles.views import ArticleViewSet
from members.views import MemberViewSet
from articles.views import CategoryViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'members', MemberViewSet, basename='member')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # JWT endpoints (obtain/refresh)
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
