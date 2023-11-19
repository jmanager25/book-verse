from django.urls import path
from .views import SavedBookListView, SavedBookDetailView


urlpatterns = [
    path('saved-books/', SavedBookListView.as_view(), name='saved-book-list'),
    path('saved-books/<int:pk>/', SavedBookDetailView.as_view(),
         name='saved-book-details'),
]
