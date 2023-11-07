from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from bookverse_api.permissions import IsOwnerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Review
from .serializers import ReviewSerializer
from django.db.models import Count


class ReviewListView(generics.ListCreateAPIView):
    """
    List and create reviews
    """
    queryset = Review.objects.annotate(
        comments_count=Count('comment', distinct=True),
        likes_count=Count('likes', distinct=True)
    ).order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
    ]
    ordering_filed = [
        'likes_count',
        'comments_count',
    ]
    filterset_fields = ['book']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Allow the owner of the review to retrieve, update or delete it
    """
    queryset = Review.objects.annotate(
        comments_count=Count('comment', distinct=True),
        likes_count=Count('likes', distinct=True)
    ).order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]
