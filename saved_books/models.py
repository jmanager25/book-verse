from django.db import models
from django.contrib.auth.models import User
from books.models import Book


class SavedBook(models.Model):
    """
    Saved books model
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('owner', 'book')

    def __str__(self):
        return f"{self.book.title} saved by {self.owner}"
