from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from pymongo import MongoClient
from bson.objectid import ObjectId


mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['todo_db']

class TodoListView(APIView):
    def get(self, request):
        todos = db.todo.find()
        todo_list = []
        for todo in todos:
            todo['_id'] = str(todo['_id'])
            todo_list.append(todo)
        return Response({'todos': todo_list}, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        db.todo.insert_one(data)
        return Response({}, status=status.HTTP_201_CREATED)

    def put(self, request, todo_id):
        data = request.data
        todo = db.todo.find_one_and_update(
            {'_id': ObjectId(todo_id)},
            {'$set': data},
            return_document=True
        )
        if not todo:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        todo['_id'] = str(todo['_id'])
        return Response({'todo': todo}, status=status.HTTP_200_OK)

    def delete(self, request, todo_id):
        todo = db.todo.find_one_and_delete({'_id': ObjectId(todo_id)})
        if not todo:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        todo['_id'] = str(todo['_id'])
        return Response({'todo': todo}, status=status.HTTP_200_OK)
