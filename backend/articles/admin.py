from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_published', 'published_at')
    prepopulated_fields = {'slug': ('title',)}

from .models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'num_article_summaries', 'article_summary_layout', 'num_related_summaries')
    search_fields = ('name',)
