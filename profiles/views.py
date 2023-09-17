from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer
from bookverse_api.permissions import IsOwnerOrReadOnly


class ProfileListView(generics.ListCreateAPIView):
    """
    List all profiles
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve and update a profile if you are the owner
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
