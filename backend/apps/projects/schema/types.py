import graphene
from graphene_django import DjangoObjectType
from apps.projects.models import Project, Task, TaskComment, Organization

class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ('id','name','slug','contact_email','created_at')

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = ('id','organization','name','description','status','due_date','created_at','tasks')

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ('id','project','title','description','status','assignee_email','due_date','created_at','comments')

class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = ('id','task','content','author_email','timestamp')
