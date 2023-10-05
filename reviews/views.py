from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from bookverse_api.permissions import IsOwnerOrReadOnly
from .models import Review
from .serializers import ReviewSerializer


class ReviewListView(generics.ListCreateAPIView):
    """
    List and create reviews
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Allow the owner of the review to retrieve, update or delete it
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]
