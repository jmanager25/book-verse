from django.urls import path
from .views import ProfileListView, ProfileDetailView

urlpatterns = [
    path('profiles/', ProfileListView.as_view(), name='profiles-list'),
    path('profiles/<int:pk>/', ProfileDetailView.as_view(),
         name='profiles-detail'),
]
