# change this models into jason words
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=Room
        fields=('id','code','host','guest_can_pause'
                ,'votes_to_skip','create_at')
        # id is automatically generated
        
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=Room
        fields=('guest_can_pause','votes_to_skip')
        
        
class UpdateRoomSerializer(serializers.ModelSerializer):
    code=serializers.CharField(validators=[])#放弃对code已经做的一些unique。。。认定
    class Meta:
        model=Room
        fields=('guest_can_pause','votes_to_skip','code')