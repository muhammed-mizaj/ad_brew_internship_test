from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

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
