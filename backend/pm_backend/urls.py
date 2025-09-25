from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

def health(request):
    return HttpResponse('OK')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health),
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
