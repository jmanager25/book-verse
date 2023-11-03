from django.db import IntegrityError
from rest_framework import serializers
from .models import SavedBook


class SavedBookSerializer(serializers.ModelSerializer):
    """
    Saved book serializer
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = SavedBook
        fields = [
            'id', 'owner', 'book', 'created_at'
            ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
