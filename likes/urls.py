from django.urls import path
from .views import LikeListView, LikeDetailView

urlpatterns = [
    path('likes/', LikeListView.as_view(), name='like-create'),
    path('likes/<int:pk>/', LikeDetailView.as_view(), name='like-detail'),
]