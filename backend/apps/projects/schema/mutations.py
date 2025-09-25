import graphene
from graphene import Field, ID, String, Mutation
from .types import ProjectType, TaskType
from apps.projects.models import Project, Task, TaskComment, Organization

class CreateProject(Mutation):
    class Arguments:
        name = String(required=True)
        description = String()
        due_date = String()

    project = Field(ProjectType)

    def mutate(self, info, name, description=None, due_date=None):
        org = getattr(info.context, 'organization', None)
        if not org:
            raise Exception('Organization context required (set X-Org-Slug header)')
        project = Project.objects.create(organization=org, name=name, description=description or '', due_date=due_date or None)
        return CreateProject(project=project)

class UpdateProject(Mutation):
    class Arguments:
        id = ID(required=True)
        name = String()
        description = String()
        status = String()

    project = Field(ProjectType)

    def mutate(self, info, id, name=None, description=None, status=None):
        org = getattr(info.context, 'organization', None)
        qs = Project.objects.filter(id=id)
        if org:
            qs = qs.filter(organization=org)
        project = qs.first()
        if not project:
            raise Exception('Project not found')
        if name is not None:
            project.name = name
        if description is not None:
            project.description = description
        if status is not None:
            project.status = status
        project.save()
        return UpdateProject(project=project)

class CreateTask(Mutation):
    class Arguments:
        project_id = ID(required=True)
        title = String(required=True)
        description = String()
        assignee_email = String()

    task = Field(TaskType)

    def mutate(self, info, project_id, title, description=None, assignee_email=None):
        org = getattr(info.context, 'organization', None)
        qs = Project.objects.filter(id=project_id)
        if org:
            qs = qs.filter(organization=org)
        project = qs.first()
        if not project:
            raise Exception('Project not found for organization')
        task = Task.objects.create(project=project, title=title, description=description or '', assignee_email=assignee_email or '')
        return CreateTask(task=task)

class AddComment(Mutation):
    class Arguments:
        task_id = ID(required=True)
        content = String(required=True)
        author_email = String(required=True)

    ok = graphene.Boolean()
    comment_id = ID()

    def mutate(self, info, task_id, content, author_email):
        org = getattr(info.context, 'organization', None)
        qs = Task.objects.filter(id=task_id)
        if org:
            qs = qs.filter(project__organization=org)
        task = qs.first()
        if not task:
            raise Exception('Task not found')
        comment = TaskComment.objects.create(task=task, content=content, author_email=author_email)
        return AddComment(ok=True, comment_id=comment.id)

class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()
    create_task = CreateTask.Field()
    add_comment = AddComment.Field()
