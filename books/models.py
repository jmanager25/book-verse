from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    author = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)
    cover_image = models.ImageField(
        upload_to='images/',
        default='../default_book_cover_p9xfbf',
        blank=True
    )
    average_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
