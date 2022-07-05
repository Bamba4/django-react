from api.models import Note
from api.serializers import NoteSerializer
from rest_framework.response import Response


def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
            serializer.save()
    return Response(serializer.data)