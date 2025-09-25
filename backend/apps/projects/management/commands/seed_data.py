from django.core.management.base import BaseCommand
from apps.projects.models import Organization, Project, Task
from django.utils import timezone

class Command(BaseCommand):
    help = "Seeds the DB with a sample organization, projects and tasks."

    def handle(self, *args, **options):
        org, created = Organization.objects.get_or_create(
            title="Demo Organization",
            defaults={"slug": "demo-org"}
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created demo organization."))

        projects_data = [
            {"name": "Website Redesign", "description": "UI refresh and accessibility improvements."},
            {"name": "Mobile App v2", "description": "New onboarding flow + analytics."},
            {"name": "Performance Work", "description": "Backend and caching improvements."},
        ]

        for p in projects_data:
            proj, created = Project.objects.get_or_create(
                organization=org,
                name=p["name"],
                defaults={
                    "description": p.get("description"),
                    "status": "ACTIVE",
                    "due_date": timezone.now() + timezone.timedelta(days=14),
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created project: {proj.name}"))

                Task.objects.create(project=proj, title="Kickoff meeting", status="TODO")
                Task.objects.create(project=proj, title="Write spec", status="IN_PROGRESS")
                self.stdout.write(self.style.SUCCESS(f"Added sample tasks to {proj.name}"))

        self.stdout.write(self.style.SUCCESS("Seeding complete."))
