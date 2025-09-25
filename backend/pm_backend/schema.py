import graphene
import apps.projects.schema.types as project_types
from apps.projects.schema.queries import Query as ProjectsQuery
from apps.projects.schema.mutations import Mutation as ProjectsMutation

class Query(ProjectsQuery, graphene.ObjectType):
    pass

class Mutation(ProjectsMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
