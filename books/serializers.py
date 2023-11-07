from rest_framework import serializers
from .models import Book
from saved_books.models import SavedBook


class BookSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    saved_id = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_saved_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            saved = SavedBook.objects.filter(
                owner=user, book=obj
            ).first()
            return saved.id if saved else None
        return None

    class Meta:
        model = Book
        fields = [
            'id', 'owner', 'title', 'description', 'author', 'genre',
            'cover_image', 'average_rating', 'created_at', 'updated_at',
            'is_owner', 'saved_id',
        ]
