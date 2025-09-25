from django.test import TestCase
from apps.projects.models import Organization, Project, Task

class ModelsTest(TestCase):
    def test_create_org_project_task(self):
        org = Organization.objects.create(name='Acme', slug='acme', contact_email='a@x.com')
        p = Project.objects.create(organization=org, name='P1')
        t = Task.objects.create(project=p, title='T1')
        self.assertEqual(p.organization, org)
        self.assertEqual(t.project, p)
