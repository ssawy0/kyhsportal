from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_published', 'published_at')
    prepopulated_fields = {'slug': ('title',)}

from .models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    def description_short(self, obj):
        if not obj or not obj.description:
            return ''
        return (obj.description[:47] + '...') if len(obj.description) > 50 else obj.description

    description_short.short_description = 'Description'

    list_display = ('name', 'parent', 'description_short', 'num_article_summaries', 'article_summary_layout', 'num_related_summaries')
    search_fields = ('name',)
