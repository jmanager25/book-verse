from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Book
from .serializers import BookSerializer
from bookverse_api.permissions import IsOwnerOrReadOnly


class BookListView(generics.ListCreateAPIView):
    """
    List all books or create a new book
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [
        filters.SearchFilter,
    ]
    search_fields = [
        "owner__username",
        "title",
        "author",
        "genre",
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve and update or delete a book if you are the owner
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsOwnerOrReadOnly]
