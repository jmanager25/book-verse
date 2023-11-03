from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from bookverse_api.permissions import IsOwnerOrReadOnly
from .models import SavedBook
from .serializers import SavedBookSerializer


class SavedBookListView(generics.ListCreateAPIView):
    """
    List and Save books when user is logged in
    """
    queryset = SavedBook.objects.all()
    serializer_class = SavedBookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SavedBookDetailView(generics.RetrieveDestroyAPIView):
    """
    The owner can Retrieve or delete saved books
    """
    queryset = SavedBook.objects.all()
    serializer_class = SavedBookSerializer
    permission_classes = [IsOwnerOrReadOnly]
