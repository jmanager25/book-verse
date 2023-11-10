from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from bookverse_api.permissions import IsOwnerOrReadOnly
from .models import Follower 
from .serializers import FollowerSerializer

class FollowerListView(generics.ListCreateAPIView):
    """
    List and create followers if logged in
    """
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class FollowerDetailView(generics.RetrieveDestroyAPIView):
    """
    Retrieve a follower or unfollow someone if the owner
    """
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [IsOwnerOrReadOnly]