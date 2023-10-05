from django.db import models
from django.contrib.auth.models import User
from books.models import Book


class Review(models.Model):
    """
    Review model, related to User and Books
    """

    RATING_CHOICES = (
        (1, '1 star'),
        (2, '2 stars'),
        (3, '3 stars'),
        (4, '4 stars'),
        (5, '5 stars'),
    )

    review_text = models.TextField()
    rating = models.PositiveIntegerField(choices=RATING_CHOICES, default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.review_text
