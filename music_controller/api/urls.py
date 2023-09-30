
from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, UserInRoom,JoinRoom,LeaveRoom,UpdateRoom

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room',GetRoom.as_view()),
    path('join-room',JoinRoom.as_view()),
    #http://127.0.0.1:8000/api/get-room("Bad Request": "Code paramater not found in request")
    #http://127.0.0.1:8000/api/get-room?code=hello"Room Not Found": "Invalid Room Code.")
    #http://127.0.0.1:8000/api/get-room?code=AJRXPY(true)
    path('user-in-room', UserInRoom.as_view()),
    path("leave-room",LeaveRoom.as_view()),
    path("update-room",UpdateRoom.as_view())
]
