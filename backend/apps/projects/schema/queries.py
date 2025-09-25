import graphene
from graphene import Field, List, Int, ID
from .types import ProjectType, TaskType
from apps.projects.models import Project, Task

class Query(graphene.ObjectType):
    projects = List(ProjectType)
    project = Field(ProjectType, id=ID(required=True))
    tasks = List(TaskType, project_id=ID(required=True))

    def resolve_projects(self, info, **kwargs):
        org = getattr(info.context, 'organization', None)
        if org:
            return Project.objects.filter(organization=org).order_by('-created_at')
        return Project.objects.none()

    def resolve_project(self, info, id):
        org = getattr(info.context, 'organization', None)
        qs = Project.objects.filter(id=id)
        if org:
            qs = qs.filter(organization=org)
        return qs.first()

    def resolve_tasks(self, info, project_id):
        org = getattr(info.context, 'organization', None)
        qs = Task.objects.filter(project_id=project_id)
        if org:
            qs = qs.filter(project__organization=org)
        return qs.order_by('-created_at')
