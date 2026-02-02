from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    # Default page size
    page_size = 10
    # Allow clients to set page size with ?page_size=X
    page_size_query_param = 'page_size'
    # Maximum allowed page size
    max_page_size = 100
