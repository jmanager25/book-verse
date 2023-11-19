from rest_framework import serializers
from .models import Review
from likes.models import Like


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for Review
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    comments_count = serializers.ReadOnlyField()
    like_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, review=obj
            ).first()
            return like.id if like else None
        return None

    class Meta:
        model = Review
        fields = [
            'id', 'owner', 'review_text', 'rating', 'book',
            'created_at', 'updated_at', 'is_owner', 'profile_image',
            'comments_count', 'like_id', 'likes_count',
        ]
