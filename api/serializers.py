from dataclasses import fields
from xml.parsers.expat import model
from api.models import Note
from rest_framework.serializers import ModelSerializer

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'